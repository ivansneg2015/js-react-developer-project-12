const apiPath = '/api/v1';
const joinPath = (endpoint) => `${apiPath}/${endpoint}`;

export default {
  loginPath: () => joinPath('login'),
  messagesPath: () => joinPath('messages'),
  channelsPath: () => joinPath('channels'),
  signUpPath: () => joinPath('signup'),
  loginPage: () => '/login',
  signUpPage: () => '/signup',
  chatPage: () => '/',
  notFoundPage: () => '*',
};
