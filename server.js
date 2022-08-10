const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

const formatMesage = (userName, text) => {
  return {
    userName,
    text,
  };
};

const botName = "Game Bot";

const users = [];

const userJoin = (id, userName, room) => {
  const user = {
    id,
    userName,
    room,
  };
  users.push(user);
  return user;
};

const getCurrentUser = (id) => users.find((user) => user.id === id);

const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getRoomUsers = (room) => users.filter((user) => user.room === room);

io.on("connection", (socket) => {
    socket.on("joinRoom", ({ roomId, userName, roomLimit }) => {
        if(getRoomUsers(roomId).length < roomLimit){
            const user = userJoin(socket.id, userName, roomId);
            console.log(getRoomUsers(roomId).length, roomLimit, user.room);
          socket.join(user.room);
    
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(user.room),
        });
        socket.on("userMsg", (msg) => {
          const user = getCurrentUser(socket.id);
          io.to(user.room).emit("message", formatMesage(user.userName, msg));
      
        });
    }else{
        return null
    }
  });


  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMesage(botName, `${user.userName} has left the room`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

http.listen(4000, () => console.log(`Server on port 4000`));
