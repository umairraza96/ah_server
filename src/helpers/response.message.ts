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
  USER_GET_ALL_SUCCESS: 'Get all users success',
  USER_GET_ALL_FAILED: 'Get all users failed',
  USER_GET_SUCCESS: 'Get user success',
  USER_GET_FAILED: 'Get user failed',

  // Category
  CATEGORY_CREATE_SUCCESS: 'Create category success',
  CATEGORY_CREATE_FAILED: 'Create category failed',
  CATEGORY_UPDATE_SUCCESS: 'Update category success',
  CATEGORY_UPDATE_FAILED: 'Update category failed',
  CATEGORY_DELETE_SUCCESS: 'Delete category success',
  CATEGORY_DELETE_FAILED: 'Delete category failed',
  CATEGORY_ALREADY_EXISTS: 'Category already exists',
  CATEGORY_NOT_FOUND: 'Category not found',
  CATEGORY_GET_ALL_SUCCESS: 'Get all categories success',
  CATEGORY_GET_ALL_FAILED: 'Get all categories failed',
  CATEGORY_GET_SUCCESS: 'Get category success',
  CATEGORY_GET_FAILED: 'Get category failed',

  // Product
  PRODUCT_CREATE_SUCCESS: 'Create product success',
  PRODUCT_CREATE_FAILED: 'Create product failed',
  PRODUCT_UPDATE_SUCCESS: 'Update product success',
  PRODUCT_UPDATE_FAILED: 'Update product failed',
  PRODUCT_DELETE_SUCCESS: 'Delete product success',
  PRODUCT_DELETE_FAILED: 'Delete product failed',
  PRODUCT_ALREADY_EXISTS: 'Product already exists',
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_GET_ALL_SUCCESS: 'Get all products success',
  PRODUCT_GET_ALL_FAILED: 'Get all products failed',
  PRODUCT_GET_SUCCESS: 'Get product success',
  PRODUCT_GET_FAILED: 'Get product failed',

  // Order
  ORDER_CREATE_SUCCESS: 'Create order success',
  ORDER_CREATE_FAILED: 'Create order failed',
  ORDER_UPDATE_SUCCESS: 'Update order success',
  ORDER_UPDATE_FAILED: 'Update order failed',
  ORDER_DELETE_SUCCESS: 'Delete order success',
  ORDER_DELETE_FAILED: 'Delete order failed',
  ORDER_GET_ALL_SUCCESS: 'Get all orders success',
  ORDER_GET_ALL_FAILED: 'Get all orders failed',
  ORDER_GET_SUCCESS: 'Get order success',
  ORDER_GET_FAILED: 'Get order failed',

  // Error Message
  UNAUTHORIZED: 'You are not authorized to perform this action',
};

export type Message = typeof message;
export type MessageKey = keyof Message;
export type MessageValue = Message[MessageKey];
