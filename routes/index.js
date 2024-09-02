const express = require("express");
// const registerUser = require("../controler/registerUser");
// const checkEmail = require("../controler/checkEmail");
// const checkPssword = require("../controler/checkPassword");
// const userDetails = require("../controler/userDetail");
// const logout = require("../controler/logout");
// const userUpdateUserDetail = require("../controler/updateUserDetail");
// const deleteUploadedFile = require("../controler/deleteUploadedFile");
// const searchUser = require("../controler/searchUser");

// const router = express.Router();
//
router.get("/", (req, res) => {
  res.send({
    deatil: {
      Title: "Welcome to Node.js API for chat pplication",
      AplicationName: "Chat-Connect",
      Version: "1.0.0",
      Auther: "Gautam Kamlesh Yadav",
    },
  });
});

// create user api
// router.post("/register", registerUser);
// router.post("/email", checkEmail);
// router.post("/password", checkPssword);
// router.get("/user-details", userDetails);
// router.get("/logout", logout);
// router.post("/update-user", userUpdateUserDetail);
// router.get("/delete-uploded-file", deleteUploadedFile);
// router.post("/serch-user", searchUser);

module.exports = router;
