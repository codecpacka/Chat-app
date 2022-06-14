import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { Socket } from "socket.io"
const app = express()
import { createServer } from "http"
import { Server } from "socket.io"

// const http = require("http");
// const cors = require("cors");

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3001"],
  },
})

io.on("connection", (socket) => {
  console.log(socket.id)
  socket.on("event-manager", (message) => {
    console.log(`mesg fron client is ${message}`)
    // io.emit("received-message", message)
  })
})

httpServer.listen(3000)
// imp: above code is of socket

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

// const server = http.createServer(app);

mongoose.connect(
  "mongodb://localhost:27017/chatUserDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB Connected")
  }
)

const userSchema = new mongoose.Schema({
  userName: "string",
  firstName: "string",
  lastName: "string",
  mobileNumber: "string",
  // image: "string",
  password: "string",
})

const User = new mongoose.model("User", userSchema)

// routes
app.post("/login", (req, res) => {
  // URL BASE POST APP
  const { mobileNumber, password } = req.body
  User.findOne({ mobileNumber: mobileNumber }, (err, user) => {
    if (user) {
      if (password === user.password) {
        res.send({ message: "Login successfull", user: user })
      } else {
        res.send({ message: "password did not match" })
      }
    } else {
      res.send({ message: "User not found" })
    }
  })
})

app.post("/register", (req, res) => {
  // URL BASE POST APP
  const { userName, firstName, lastName, mobileNumber, image, password } =
    req.body
  User.findOne({ mobileNumber: mobileNumber }, (err, user) => {
    // check email
    if (user) {
      res.send({ message: "user already registerd" })
    } else {
      const user = new User({
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        image: image,
        password: password,
      })
      user.save((err) => {
        if (err) {
          res.send(err)
        } else {
          res.send({ message: "Successfully Registered , plese Login " })
        }
      })
    }
  })
})

// Profile Routes

app.get("/profile/:id", async (req, res) => {
  // console.log("showing data")
  console.log(req.params.id)
  console.log("got a request")

  const data = await User.findById(req.params.id)
  console.log(data)
  res.send(data)
  console.log("server request ends here")
})

app.listen(9002, () => {
  console.log("BE started at port 9002")
})
