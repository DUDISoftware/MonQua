const { Server } = require("socket.io");

let io;

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // ⚠️ chỉnh nếu dùng domain riêng
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId);
      console.log(`📥 ${socket.id} joined ${conversationId}`);
    });

    socket.on("sendMessage", (data) => {
      const { conversationId, message } = data;
      io.to(conversationId).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) throw new Error("Socket.io chưa được khởi tạo!");
  return io;
};

module.exports = { initSocket, getIO };
