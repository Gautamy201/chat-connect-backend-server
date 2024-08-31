const { messageModel } = require("../model/conversationModel");
const UserModel = require("../model/userModel");
const bcrptyjs = require("bcryptjs");
async function registerUser(request, response) {
  try {
    const { name, email, password, profile_pic } = request.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return response.status(400).json({
        message: "User already registered",
        error: true,
      });
    }
    const salt = await bcrptyjs.genSalt(10);
    const hashedPassword = await bcrptyjs.hash(password, salt);
    const payload = {
      name,
      email,
      profile_pic,
      password: hashedPassword,
    };
    const newUser = new UserModel(payload);
    const userSave = await newUser.save();
    return response.status(201).json({
      message: "User registered successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser;
