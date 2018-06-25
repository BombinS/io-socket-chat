let express = require("express");
let app = express();
let server = require("http").createServer(app);
let io = require("socket.io").listen(server);

// initialize array for connected users
let users = [];
// initialize array for active connections
let connections = [];

server.listen(process.env.PORT || 3000);
console.log("server running");

//route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

// connect
io.sockets.on("connection", function(socket) {
  connections.push(socket);
  console.log(`Connected: ${connections.length} sockets connected`);

  // disconnect
  socket.on("disconnect", function(data) {
    //if (!socket.username) return;
    users.splice(users.indexOf(socket.username), 1);
    updateUsersNames();
    console.log(`The user ${socket.username} is disconnected`);
    connections.splice(connections.indexOf(socket));
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  // send message
  socket.on("send message", function(data) {
    console.log(`The user ${socket.username} send the message ${data}`);
    io.sockets.emit("new message", { msg: data, user: socket.username });
  });

  // new user
  socket.on("new user", function(data, callback) {
    callback(true);
    socket.username = data;
    console.log(`The user ${socket.username} is connected`);
    users.push(socket.username);
    updateUsersNames();
  });

  function updateUsersNames() {
    io.sockets.emit("get users", users);
  }
});
