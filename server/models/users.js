import bcrypt from 'bcrypt';
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

const validatePassword = {
  validator (pass) {
    return validation.isValidPassword(pass);
  },
  message: 'Password need to be between 6-20 characters, at least one number, one lowercase, one uppercase letter and one special character.'
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
      validate: validatePassword,
      trim: true,
      required: true
    }
  },
  { timestamps: true },
);

Users.post('validate', function (data, next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

Users.pre('save', async function (next) {
  const userAlreadyExists = await this.constructor.find(
    {
      $or: [
        { user: { $regex: new RegExp(this.user, 'i') } },
        { email: { $regex: new RegExp(this.email, 'i') } }
      ]
    });
  if (userAlreadyExists.length) {
    const error = new Error(`Email "${this.email}" or user "${this.user}" already exists!`);
    next(error);
  }
});

// Declare Model to mongoose with Schema
mongoose.model('users', Users);

// Export Model to be used in Node
export default mongoose.model('users');
