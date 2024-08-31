const { response } = require("express");
const userModel = require("../model/userModel");

async function checkEmail(req, res) {
  try {
    const { email } = req.body;
    const checkEmail = await userModel.findOne({ email }).select("-password");

    if (!checkEmail) {
      return res.status(400).json({
        message: "Email not register",
        error: true,
      });
    }

    return res.status(200).json({
      message: "Email verify",
      success: true,
      data: checkEmail,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}

module.exports = checkEmail;
