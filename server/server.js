const http = require("http").createServer();
const io = require("socket.io")(http, {
  // allowing all cors connections
  cors: { origin: "*" },
});
const port = 3000;

io.on("connection", (socket) => {
  const time = socket.handshake.time;
  const origin = socket.handshake.headers.origin;
  console.log(`${time}:
  Successful connection with a client
  id: ${socket.id}
  origin: ${origin}\n`);

  // listen for messages from users
  socket.on("message", (msg) => {
    console.log(`${msg.time} Received a message from ${msg.user}: ${msg.text}`);

    // emit messages to all connected users
    io.emit("message", `${msg.time} ${msg.user}: ${msg.text}`);
  });
});

io.on("disconnect", () => {
  console.log("Client has disconnected");
});

http.listen(port, () =>
  console.log("Server is working on http://localhost:3000\n")
);
