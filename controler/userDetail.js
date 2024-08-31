const getUserDeatilFromToken = require("../helper/getUserDetailFromToken");
async function userDetails(req, res) {
  try {
    const token = req.cookies.token || "";

    const user = await getUserDeatilFromToken(token);
    return res.status(200).json({
      message: "userDetail",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
}

module.exports = userDetails;
