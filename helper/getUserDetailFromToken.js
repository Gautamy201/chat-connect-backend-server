const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");
const getUserDeatilFromToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }
  const decode = await jwt.verify(token, process.env.JWT_SCREATE_KEY);

  const user = await UserModel.findById(decode.userId).select("-password");

  return user;
};

module.exports = getUserDeatilFromToken;
