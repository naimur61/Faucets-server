const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const { generateToken } = require("../config/jwtToken");


// Register user 
const createUser = asyncHandler(async (req, res) => {
   const email = req.body.email;
   const findUser = await User.findOne({ email: email });
   if (!findUser) {
      // Create a new user
      const newUser = User.create(req.body);
      res.json(newUser);
   } else {
      throw new Error('User Already Exists')
   }
})

// Login User 
const loginUserCtrl = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   // Check if the user Exists or not
   const findUser = await User.findOne({ email })
   if (findUser && await findUser.isPasswordMatched(password)) {
      res.json({
         _id: findUser?._id,
         email: findUser?.email,
         role: findUser?.role,
         token: generateToken(findUser?._id)
      })
   } else {
      throw new Error("Invalid Credentials");
   }
});


// Logout Function 
const logout = (req, res) => {
   res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
   });
   res.status(200).json({ status: 'success' });
};


// Get all user 
const getAllUsers = asyncHandler(async (req, res) => {
   try {
      const getUsers = await User.find();
      res.json(getUsers);
   } catch (error) {
      throw new Error(error);
   }
})



module.exports = { createUser, loginUserCtrl, getAllUsers, logout }