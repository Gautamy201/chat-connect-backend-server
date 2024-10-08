const express = require("express");
const { Server } = require("socket.io");
const app = express();
const { createServer } = require("http");
// const getUserDetailFromToken = require("../helper/getUserDetailFromToken");
// const userModel = require("../model/userModel");
// const {
//   conversationModel,
//   messageModel,
// } = require("../model/conversationModel.js");

// soket connection
const url = ["https://chat-connect-app.netlify.app", "http://localhost:5173"];
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: url,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// online user

const onlineUser = new Set();

io.on("connection", async (socket) => {
  console.log("connected user", socket.id);

  // const token = socket.handshake.auth.token;

  // // current user detail
  // const user = await getUserDetailFromToken(token);

  // // create a room
  // socket.join(user?._id?.toString());
  // onlineUser.add(user?._id?.toString());

  // io.emit("onlineUser", Array.from(onlineUser));

  // console.log(onlineUser);

  // socket.on("message-page", async (userId) => {
  //   console.log("user-Id", userId);
  //   if (userId) {
  //     const userDetail = await userModel.findById(userId).select("-password");
  //     const payload = {
  //       _id: userDetail._id,
  //       name: userDetail.name,
  //       email: userDetail.email,
  //       profile_Pic: userDetail.profile_Pic,
  //       online: onlineUser.has(userId),
  //     };
  //     socket.emit("message-user", payload);

  //     // previas mwssage --------------------------

  //     const getConversation = await conversationModel
  //       .findOne({
  //         $or: [
  //           { sender: user?._id, receiver: userId },
  //           { sender: userId, receiver: user?._id },
  //         ],
  //       })
  //       .populate("messages")
  //       .sort({ updatedAt: -1 });

  //     if (getConversation) {
  //       socket.emit("new-message", getConversation.messages);
  //     } else {
  //       socket.emit("new-message", []);
  //     }
  //   }

  //   // ----------------------------
  // });
  // // new msg
  // socket.on("send-message", async (data) => {
  //   // check converstion both user
  //   if (data) {
  //     let conversation = await conversationModel.findOne({
  //       $or: [
  //         { sender: data?.sender, receiver: data?.receiver },
  //         { sender: data?.receiver, receiver: data?.sender },
  //       ],
  //     });
  //     if (!conversation) {
  //       const newConversation = new conversationModel({
  //         sender: data?.sender,
  //         receiver: data?.receiver,
  //         messages: [],
  //       });
  //       conversation = await newConversation.save();
  //     }

  //     const message = await messageModel({
  //       textNessage: data.message.textMessage,
  //       imageUrl: data.message.imageUrl,
  //       videoUrl: data.message.videoUrl,
  //       mesByUserId: data.mesByUserId,
  //     });
  //     const saveMasage = await message.save();

  //     const updateConversation = await conversationModel.updateOne(
  //       {
  //         _id: conversation._id,
  //       },
  //       {
  //         $push: {
  //           messages: saveMasage._id,
  //         },
  //       }
  //     );
  //     const getConversation = await conversationModel
  //       .findOne({
  //         $or: [
  //           { sender: data?.sender, receiver: data?.receiver },
  //           { sender: data?.receiver, receiver: data?.sender },
  //         ],
  //       })
  //       .populate("messages")
  //       .sort({ updatedAt: -1 });

  //     io.to(data?.sender).emit("new-message", getConversation.messages);
  //     io.to(data?.receiver).emit("new-message", getConversation.messages);
  //   }
  // });

  // // ----------------------------

  // socket.on("sidebar", async (currentUserId) => {
  //   console.log("fronten side => ", currentUserId);
  //   if (currentUserId) {
  //     const currentUserConversation = await conversationModel
  //       .find({
  //         $or: [{ sender: currentUserId }, { receiver: currentUserId }],
  //       })
  //       .populate("sender")
  //       .populate("receiver")
  //       .populate("messages")
  //       .populate("updatedAt")
  //       .sort({ updatedAt: -1 });

  //     const conversation = currentUserConversation.map((conv) => {
  //       const lastMessage = conv.messages[conv.messages.length - 1];
  //       const seenMesgsCount = conv.messages.reduce(
  //         (preve, current) => preve + (current.seen ? 0 : 1),
  //         0
  //       );
  //       return {
  //         _id: conv._id,
  //         sender: conv.sender,
  //         receiver: conv.receiver,
  //         messages: lastMessage,
  //         unSeenmsg: seenMesgsCount,
  //       };
  //     });

  //     socket.emit("allConversation", conversation);
  //   }
  // });

  // disconnect
  io.on("disconnect", () => {
    onlineUser.delete(user?._id);
    console.log("disconnected user", socket.id);
  });
});

module.exports = {
  app,
  server,
};
