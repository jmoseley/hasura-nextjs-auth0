import React from 'react';
import { shallow } from 'enzyme';
import LoginButton from '../LoginButton';

test('LoginButton', () => {
  const wrapper = shallow(<LoginButton />);
  expect(wrapper.text()).toMatch('Log In');
});
