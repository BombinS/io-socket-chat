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
