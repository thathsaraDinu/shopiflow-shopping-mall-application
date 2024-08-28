import { loginUserValidation } from './auth-validation.js';
import { createUserValidation } from './user-validation.js';
import { createProductValidation } from './product-validation.js';

export const schemas = {
  // User Validation Schema
  createUser: createUserValidation,

  // Auth Validation Schema
  loginUser: loginUserValidation,

  // Product Validation Schema
  createProduct: createProductValidation
};
