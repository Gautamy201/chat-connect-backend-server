const UserModel = require("../model/userModel");
const searchUser = async (req, res) => {
  try {
    const { search } = req.body;

    const query = new RegExp(search, "i", "g");
    const user = await UserModel.find({
      $or: [{ name: query }, { email: query }],
    });
    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "allUser",
      data: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

module.exports = searchUser;
