import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name is required'],
      unique: false
    },
    lastName: {
      type: String,
      required: [true, 'Last Name is required'],
      unique: false
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true
    },
    role: {
      type: String,
      default: 'user',
      enum: ['admin', 'owner', 'user'],
      required: [true, 'User Role is required'],
      unique: false
    },
    gender: {
      type: String,
      enum: ['male', 'female'],
      required: [true, 'Gender is required']
    },
    mobile: {
      type: String,
      required: [true, 'Mobile Number is required'],
      unique: false
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      unique: false
    }
  },
  {
    timestamps: { currentTime: () => Date.now() + 5.5 * 60 * 60 * 1000 }
  }
);

export default mongoose.model.Users || mongoose.model('User', UserSchema);