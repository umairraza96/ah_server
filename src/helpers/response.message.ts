export const message = {
  // Auth
  AUTH_SIGNUP_SUCCESS: 'Sign up success',
  AUTH_SIGNUP_FAILED: 'Sign up failed',
  AUTH_LOGIN_SUCCESS: 'Login success',
  AUTH_LOGIN_FAILED: 'Login failed',
  AUTH_LOGOUT_SUCCESS: 'Logout success',
  AUTH_LOGOUT_FAILED: 'Logout failed',
  AUTH_INVALID_CREDENTIALS: 'Invalid credentials',

  // User
  USER_CREATE_SUCCESS: 'Create user success',
  USER_CREATE_FAILED: 'Create user failed',
  USER_UPDATE_SUCCESS: 'Update user success',
  USER_UPDATE_FAILED: 'Update user failed',
  USER_DELETE_SUCCESS: 'Delete user success',
  USER_DELETE_FAILED: 'Delete user failed',
  USER_ALREADY_EXISTS: 'User already exists',
  USER_NOT_FOUND: 'User not found',
};

export type Message = typeof message;
export type MessageKey = keyof Message;
export type MessageValue = Message[MessageKey];
