import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

socket.on('connect', () => {
    console.log('Connected to server');
    socket.emit('setup', { _id: 'testUserId' });

    socket.on('Connected', () => {
        console.log('Received Connected event');
        socket.close();
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
