const express =   require("express")
const app =express();
const http = require("http").createServer(app);
const io = require("socket.io")(http)

app.use(express.static(__dirname+"/public"))

io.on("connection" , (socket)=>{  // this is checking for connection , if there is any connection from the client
   io.emit("status" , "users connected")  // event emittng  , this is for how many users coonected to server ,it event will listen at the client end
    console.log("Client Connected.") 
    socket.on("message" , (msg)=>{  //it will check the message from the client
        console.log(msg) // recevied msg from client
        io.emit("message" , msg)  // this will send user msg to all users .. 
    })  

    socket.on("disconnect" , ()=>{   // this for disconnection .
        console.log("User Disconnected")
        io.emit("disconnected") // to reduce the connected users , when disconnection happens
    })
})

app.listen("8080" , ()=>{
    console.log("server running on port 8080")
})