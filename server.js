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
  console.log(`Socket ${socket.id} is connected`);
  console.log(`Connected: ${connections.length} sockets connected`);

  // disconnect
  socket.on("disconnect", function(data) {
    console.log(`Socket ${socket.id} is dissconnected`);
    connections.splice(connections.indexOf(socket));
    console.log(`Disconnected: ${connections.length} sockets connected`);
  });

  // send message
  socket.on("send message", function(data) {
    console.log(data);
    io.sockets.emit("new message", { msg: data });
  });
});
