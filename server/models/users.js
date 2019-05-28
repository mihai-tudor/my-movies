import mongoose from 'mongoose';
import * as validation from '../../src/common/formValidation';

const validateUsername = {
  validator (user) {
    return validation.isValidUsername(user);
  },
  message: 'Username needs to be between 3-16 characters, starts with a letter and can contain only letters, number, dot, underscore and dash.'
};

const validateEmail = {
  validator (email) {
    return validation.isValidEmail(email);
  },
  message: 'E-mail format is wrong!'
};

// Declare Schema
const Users = new mongoose.Schema(
  {
    user: {
      type: String,
      trim: true,
      validate: validateUsername,
      required: true
    },
    email: {
      type: String,
      validate: validateEmail,
      trim: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    }
  },
  { timestamps: true },
);

// Declare Model to mongoose with Schema
mongoose.model('users', Users);

// Export Model to be used in Node
export default mongoose.model('users');
