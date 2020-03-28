const chatForm = document.getElementById('chat-form');
const chatMsg =  document.querySelector('.chat-messages');
const input = document.getElementById('msg');
const socket = io();

// Get username and roomname from URl
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join chatroom
socket.emit('joinRoom', { username, room });

//getting a common msg from server and displaying it on client
socket.on('message', message => {
    console.log(message);

    ShowMsg(message);

    //scroll to last msg
    chatMsg.scrollTop = chatMsg.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //-----------------getting message from input type (chat->server->chat)
    const msg = input.value;
    //for brodcasting above msg i.e. to server
    socket.emit('chatMessage', msg);
    input.value = '';
    input.focus();

});

function ShowMsg(message){
    var div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
						<p class="text">${message.text}</p>`;

    chatMsg.append(div);
}