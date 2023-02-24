import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import validator from 'validator';


const schema = mongoose.Schema;
const userModel = new schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Email in use choose another'],
    lowercase: true,
    validator: [validator.isEmail, 'Please input valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Length should be 6'],
    maxlength: [12, 'length should be lower than 12 characters'],
  },
  role: {
    type: String,
    default: 'local',
    enum: ['admin', 'local'],
  },
 
  // profileImage: {
  //   type: String,
  //   default:
  //     'https://res.cloudinary.com/nrob/image/upload/v1613451239/npc5d5r9g0nyyihppqxd.png',
  // },
  // location: {
  //   type: String,
  //   default: 'none',
  // },
  // phone: {
  //   type: String,
  //   default: 'none',
  // },
  // birthDate: {
  //   type: String,
  //   default: 'none',
  // },
 

  // desc: {
  //   type: String,
  //   default: 'none',
  // },
});
userModel.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);
});

userModel.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userModel);

export default User;

