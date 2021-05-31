const colors = require("colors");
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { notFound, errorHandler } = require("./middleware/error");
const connectDB = require("./db");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const jwt = require("jsonwebtoken");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const { cookie } = require("express-validator");
const User = require("./models/User");


const { json, urlencoded } = express;

connectDB();
const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*"
  }
});

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

io.use((socket, next) => {
  let token = cookie.parse(socket.handshake.headers?.cookie || "").token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
      if (err) {
        next(new Error("Invalid Token"))
      } else {
        const user = await User.findById(decoded.id);
        if (!user) {
          next(new Error("User not found!"));
        }
      }
    })
  } else {
    next(new Error("User Authentication Failed!"));
  }
}).on("connection", (socket) => {
  console.log(user);
})

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/profiles", profileRouter);
app.use("/api", uploadRouter);
app.use("/requests", requestRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname), "client", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = { app, server };
