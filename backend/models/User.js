import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 3,
  },
  lastName: {
    type: String,
    min: 3,
  },
  email: {
    type: String,
    min: 3,
  },
  password: {
    type: String,
    min: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
