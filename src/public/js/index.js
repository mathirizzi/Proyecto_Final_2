const socket = io();
socket.emit("message", 'Hola, me estoy comunicando desde websocket');