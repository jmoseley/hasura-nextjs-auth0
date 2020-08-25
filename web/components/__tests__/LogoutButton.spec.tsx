import React from 'react';
import { shallow } from 'enzyme';
import LogoutButton from '../LogoutButton';

test('LogoutButton', () => {
  const wrapper = shallow(<LogoutButton />);
  expect(wrapper.text()).toMatch('Log Out');
});
