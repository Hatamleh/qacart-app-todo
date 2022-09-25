import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { loginSchema, signupSchema } from "../validations/user.js";
import jwt from "jsonwebtoken";

router.post("/register", async (req, res) => {
  // Validate request Data
  const { error } = await signupSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }

  const { firstName, lastName, email, password } = req.body;

  // Check if Email exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).json({ message: "Email is already exists in the Database" });
    return;
  }

  //Hash the password
  const sault = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, sault);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  try {
    const addedUser = await newUser.save();
    const token = await jwt.sign(
      {
        id: addedUser._id,
        firstName: addedUser.firstName,
        lastName: addedUser.lastName,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token);
    res.cookie("userID", addedUser._id);
    res.cookie("firstName", addedUser.firstName);

    return res.status(201).json({ access_token: token, userID: addedUser._id, firstName: addedUser.firstName });
  } catch (err) {
    res.json({ message: "Something went wrong, please try again" });
  }
});

router.post("/login", async (req, res) => {
  // Validate request Data
  const { error } = await loginSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: "Please Fill a correct Password" });
    return;
  }

  const { email, password } = req.body;
  // Check if Email exists
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "We could not find the email in the database" });
      return;
    }

    // Check if the password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      res.status(401).json({
        message: "The email and password combination is not correct, please fill a correct email and password",
      });
      return;
    }

    const token = await jwt.sign(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      process.env.JWT_SECRET
    );

    res.cookie("access_token", token);
    res.cookie("userID", user._id);
    res.cookie("firstName", user.firstName);

    return res.status(200).json({ access_token: token, userID: user._id, firstName: user.firstName });
  } catch (err) {
    res.json({ message: "Something went wrong, please try again" });
  }
});

export default router;
