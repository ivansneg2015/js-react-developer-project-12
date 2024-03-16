const apiPatch = '/api/v1';

export default {
  loginPath: () => [apiPatch, 'login'].join('/'),
  signupPath: () => [apiPatch, 'signup'].join('/'),
  usersPath: () => [apiPatch, 'data'].join('/'),
  chatPagePath: '/',
  chatPageLogin: '/login',
  chatSignup: '/signup',
};
