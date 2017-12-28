import authReducer from '../../reducers/auth';

test('should add uid when login', () => {
  const action = {
    type: 'LOGIN',
    uid: '12354trlkjsfsdflkn'
  };

  const state = authReducer({}, action);
  expect(state.uid).toBe(action.uid);
});

test('should Remove uid when logout', () => {
  const action = {
    type: 'LOGOUT'
  };

  const state = authReducer({uid: "343245tewf"}, action);
  expect(state).toEqual({});
});