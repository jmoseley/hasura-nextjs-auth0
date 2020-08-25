import React from 'react';
import { act } from 'react-dom/test-utils';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { shallow } from 'enzyme';

import { FetchTodosDocument, FetchTodosSubscription } from '../../generated/graphql';
import TodoList from '../TodoList';

const mocks: ReadonlyArray<MockedResponse<FetchTodosSubscription>> = [
  {
    request: {
      query: FetchTodosDocument,
    },
    result: {
      data: {
        todos: [{ id: '12345', name: 'Todo1', completed: false }],
      },
    },
  },
];

test(`TodoList`, async () => {
  let wrapper: ReturnType<typeof shallow>;
  await act(async () => {
    wrapper = shallow(
      <MockedProvider mocks={mocks} addTypename={false}>
        <TodoList />
      </MockedProvider>,
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  });

  console.log(wrapper.html());

  expect(wrapper.contains(<h1>Todo1</h1>)).toBe(true);
});
