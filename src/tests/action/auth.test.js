import { login, logout } from '../../actions/auth';

test('Should setup login action object', () => {
  const uid = '232ewqdwqd';
  const action = login(uid);
  expect(action).toEqual({
    uid: uid,
    type: 'LOGIN'
  });
});


test('Should setup logout action object', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});

