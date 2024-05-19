const apiPath = '/api/v1';

const apiRoutes = {
  loginPath: () => `${apiPath}/login`,
  messagesPath: () => `${apiPath}/messages`,
  channelsPath: () => `${apiPath}/channels`,
  signUpPath: () => `${apiPath}/signup`,
  loginPage: '/login',
  signUpPage: '/signup',
  chatPage: '/',
  notFoundPage: '*',
};

export default apiRoutes;
