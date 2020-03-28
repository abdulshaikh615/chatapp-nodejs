const path = require('path'); // to use path
const http = require('http'); // for requesting http req
const express = require('express'); // express is a nodejs framework
const socketio = require('socket.io'); //sockets for realtime application
const msgformat = require('./public/utils/msgformat'); // to get msg format
const {userJoin, getCurrentUser} = require('./public/utils/users'); // to get msg format
//const user = document.getElementById('username');


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public'))); //to set path when this files runs & dirname helps to get cur direc and concat public to set path

io.on('connection', socket => {

//-------------------------------------------------------------------------------------------
    socket.on('joinRoom', ({username, room}) => { //runs when someone connects to server
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        
        socket.emit('message', msgformat(username, 'Welcome to Chat Room')); // used for single clients

        socket.broadcast.to(user.room).emit('message', msgformat(user.username, `${user.username} has Joined the Chat`)); // used for all client except current client
        //for all client io.emit();    
    });
//-------------------------------------------------------------------------------------------


    //runs on submit from chat->server->chat
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        //server->chat passed to main msg
        io.emit('message', msgformat(user.username ,msg));
    });

    
    //runs when a client disconnects
    socket.on('disconnect', () => {
        console.log('message', msgformat(user.username,'A User has Left the Chat'));
    });
    
});
server.listen(3000 || process.env.PORT, () => console.log('Hello'));