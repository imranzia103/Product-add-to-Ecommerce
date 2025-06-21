import User from "../model/Schema.js";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new Error("pleae Fill All The Feields");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) res.status(400).send("User Already Taken");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    createToken(res, newUser._id);
    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      password: newUser.hashedPassword,
      isAdmin: newUser.isAdmin,
    });
  } catch (error) {
    throw new Error("Invalid User Data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        password: existingUser.hashedPassword,
        isAdmin: existingUser.isAdmin,
      });

      return;
    }
  }
});



const logoutCurrentUser = asyncHandler(async(req, res)  => {
    res.cookie("jwt", " ", {
        httpOnly: true,
        expires: new Date(0),

    });
    res.status(200).json({message:"LogOut Sucessfully!!!!"})
});



const getAllUsers = asyncHandler(async (req, res)  => {

const users = await User.find({});
res.json(users);
});

export { createUser, loginUser, logoutCurrentUser, getAllUsers };
