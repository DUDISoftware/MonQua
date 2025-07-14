const { Server } = require("socket.io");

let io;
const onlineUsers = new Map(); // <userId, socketId>

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    // Ghi nhận người dùng online
    socket.on("registerUser", (userId) => {
      onlineUsers.set(userId, socket.id);
      socket.userId = userId;

      console.log(`✅ User ${userId} online`);
      io.emit("userOnline", userId);
    });

    // Tham gia phòng chat
    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId);
      console.log(`📥 ${socket.id} joined ${conversationId}`);
    });

    // Gửi tin nhắn
    socket.on("sendMessage", (data) => {
      const { conversationId, message } = data;
      io.to(conversationId).emit("receiveMessage", message);
    });

    // Kiểm tra user có online không (dùng cho ChatHeader)
    socket.on("checkOnline", (userId, callback) => {
      callback(onlineUsers.has(userId));
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        console.log(`🔴 User ${socket.userId} offline`);
        onlineUsers.delete(socket.userId);
        io.emit("userOffline", socket.userId);
      } else {
        console.log("🔴 Client disconnected:", socket.id);
      }
    });
  });
};

const getIO = () => {
  if (!io) throw new Error("Socket.io chưa được khởi tạo!");
  return io;
};

module.exports = { initSocket, getIO };
