require("dotenv").config();

const http = require("http");
const app = require("./app");
const serve = http.createServer(app);
const {Server:server} = require("socket.io");
const io = new server(serve);//now we have two middlewares upon our express app
let users = {};


io.on("connection",socket=>{

socket.on("new-user-connected",username=>{
    users[socket.id] = username;

    console.log(users);

    socket.broadcast.emit("joined",username);
});

socket.on("send",message=>{
    socket.broadcast.emit("receive",{message:message,name:users[socket.id]});
});

socket.on("disconnect",data=>{
    io.emit("left",{message:"left the chat",client:users[socket.id]});
    delete users[socket.io];
    console.log(users);
})

});



serve.listen(process.env.PORT,()=>{
    console.log("Started Listening at PORT",process.env.PORT);
});
