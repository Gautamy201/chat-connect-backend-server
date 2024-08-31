const getUserDeatilFromToken = require("../helper/getUserDetailFromToken");
const userModel = require("../model/userModel");

async function userUpdateUserDetail(req, res) {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDeatilFromToken(token);

    const { name, profile_Pic } = req.body;

    const updateUser = await userModel.updateOne(
      { _id: user._id },
      {
        name,
        profile_Pic,
      }
    );

    const userInformation = await userModel.findById(user._id);

    return res.status(200).json({
      message: "User detail updated successfully",
      user: userInformation,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = userUpdateUserDetail;
