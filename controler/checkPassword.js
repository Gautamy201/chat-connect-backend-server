const { response } = require("express");
const UserModel = require("../model/userModel");
const bcrptyjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function checkPssword(req, res) {
  try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    const verifyPassword = await bcrptyjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Password Incorrect",
        error: true,
      });
    }
    const tokenData = {
      userId: user._id,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SCREATE_KEY, {
      expiresIn: "1d",
    });

    const cookieOption = {
      http: true,
      secure: true,
    };
    return res.cookie("token", token, cookieOption).status(200).json({
      message: "Login successfully",
      success: true,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}

module.exports = checkPssword;
