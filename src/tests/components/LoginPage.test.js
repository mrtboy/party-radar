import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../../components/LoginPage';
;
test('should render Login Page', ()=> {
  const wrapper = shallow(<LoginPage startLogin={()=>{}}/>);
  expect(wrapper).toMatchSnapshot();
});



test('Should call startLogin on button Click', ()=>{
  const startLogin = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
  wrapper.find('button').simulate('click');
  expect(startLogin).toHaveBeenCalled();
});