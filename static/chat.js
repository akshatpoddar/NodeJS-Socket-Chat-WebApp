var url = window.location.host;
var socket = io.connect(url);

var message  = document.getElementById('message'),
    btn = document.getElementById('send'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    typing_status = document.getElementById('typing');


btn.addEventListener('click',()=>{
    socket.emit('chat',{
        'message':message.value,
        'handle':handle.value
    });
    message.value = '';
});

message.addEventListener("keyup", e=> {
    if(e.keyCode === 13 ){
        e.preventDefault();
        btn.click();
    }
});

socket.on('chat',data=>{
    typing_status.innerHTML = '';
    output.innerHTML += '<p> <strong>'+data.handle+ ': </strong>' + data.message + '</p>';
});

message.addEventListener('keypress',()=>{
    socket.emit('typing',handle.value);
});

socket.on('typing',data=>{
    typing_status.innerHTML = '<p><em>'+data + ' typing... </em></p>';
});
