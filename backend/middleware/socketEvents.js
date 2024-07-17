const { getUserById } = require("../controller/User");

const handleSocketEvents = (io) => {
  io.on('connection', (socket) => {
    socket.on("join", (data) => {
      console.log("room joined", data);
      socket.join(data);
    });
    socket.on("request_user", async (receverUserId, senderUserId) => {
      console.log("receverUserId", receverUserId, "senderUserId", senderUserId);
      try {
        const response = await getUserById(receverUserId);
        if (response) {
          // Emit a notification to the user who received the request
          await socket.join(receverUserId);
          await io.in(receverUserId).emit('show_notification', response);

          // Emit a notification to the user who send the request
          await socket.join(senderUserId);
          io.to(senderUserId).emit('sent_notification', response);
        }
      } catch (e) {
        console.error('Error in request_user event:', e);
      }

    });

  });
};

module.exports = handleSocketEvents