console.log("inside js file");

const socket = io("http://localhost:5500");

const form = document.querySelector("#send");
const messageInput = document.getElementById("message");
const messageContainer = document.querySelector(".container");

function append(message,position){
    const  newUserJoinedMessage = document.createElement("div");
    newUserJoinedMessage.innerText = message;
    newUserJoinedMessage.classList.add("message");
    newUserJoinedMessage.classList.add(position);
    messageContainer.append(newUserJoinedMessage); 
};
form.addEventListener("submit",(event)=>{
    event.preventDefault();
    const message = messageInput.value;
    append(`You  ${message} `,"right");//this will be my message
    socket.emit("send",message);//now we are sending our message to the user
    messageInput.value = "";
});
let user = prompt("Enter your name");

socket.emit("new-user-connected",user);

socket.on("joined",username=>{
    console.log("hello inside chat");
    append(`${username} joined the chat`,"right");
    
});


socket.on("receive",data=>{
    append(`${data.name}: ${data.message} `,"left");
});

socket.on("left",name=>{
    append(`${name.client} ${name.message}`,"left");
})