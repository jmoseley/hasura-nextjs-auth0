// eslint-disable-next-line @typescript-eslint/no-unused-vars
function userSyncRule(user, context, callback) {
  const auth0_id = user.user_id;
  const name = user.nickname;
  const email = user.email;

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const request = require('request');

  const mutation = `
mutation insertUser($auth0_id: String!, $name: String!, $email: citext!) {
  insert_users(objects: {name: $name, auth0_id: $auth0_id, email: $email}, on_conflict: {constraint: users_auth0_id_key, update_columns: [name, email]}) {
    returning {
      id
    }
  }
}`;

  request.post(
    {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': configuration.ACCESS_KEY,
      },
      url: configuration.HASURA_ENDPOINT,
      body: JSON.stringify({ query: mutation, variables: { auth0_id, name, email } }),
    },
    function (error, response, body) {
      let parsedBody;
      try {
        parsedBody = JSON.parse(body);
      } catch (e) {
        console.warn('Body is not valid JSON.');
        return callback(new Error(`Invalid response from server. Response not parsable.`));
      }
      // Check for graphql errors
      if (parsedBody.errors && parsedBody.errors.length > 0) {
        console.error(parsedBody.errors);
        return callback(new Error(`Error: ${parsedBody.errors.map((error) => error.message).join(' ')}`));
      } else {
        return callback(error, user, context);
      }
    },
  );
}
