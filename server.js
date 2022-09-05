const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["*", "http://localhost:5000"],
    methods: ["GET", "POST", "DELETE", "PATCH"],
  })
);

app.get("/", (req, res) => {
  res.send("ding-dong");
});

const port = 5000;
server.listen(port, "0.0.0.0", () => {
  console.log(`server is running at port ${port}`);
});

io.on("connection", (socket) => {
  let fakeData = [
    {
      name: "a0",
      color: "red",
    },
  ];
  console.log(socket.data);
  console.log(socket.id);
  socket.emit("called-faked", fakeData);

  socket.on("disconnect", () => {
    console.log("oi yo taw gayep vayo");
  });

  socket.on("msg", (data) => {
    console.log(data.name);
    socket.emit("res", `hello ${data.name}. Welcone`);
  });

  socket.on("joinedRoom", (id) => {
    socket.join(id);
  });

  socket.on("leavedRoom", (id) => {
    socket.leave(id);
  });
});
