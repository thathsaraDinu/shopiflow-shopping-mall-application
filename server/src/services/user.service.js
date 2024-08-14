import UserSchema from '../models/user.model.js';
import bcrypt from 'bcrypt';

// Register a new user
export const register = async (data) => {
  try {
    // Check if the user already exists
    const exitistingUser = await UserSchema.findOne({
      email: data.email
    });

    if (exitistingUser) {
      throw {
        status: 400,
        message: 'User already exists'
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user object
    const user = new UserSchema({
      ...data,
      password: hashedPassword
    });

    // Save the user object to the database
    await user.save();

    return user;
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};

// Get user profile details
export const getProfile = async (id) => {
  try {
    // Find the user by ID
    const user = await UserSchema.findById(id);

    // If the user is not found, throw an error
    if (!user) {
      throw {
        status: 404,
        message: 'User not found'
      };
    }

    // Return only the necessary user details
    return {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      gender: user.gender,
      mobile: user.mobile
    };
  } catch (error) {
    throw {
      status: 500,
      message: error.message
    };
  }
};
