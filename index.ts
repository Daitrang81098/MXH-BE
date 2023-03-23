// index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './src/data-source';
import cors from 'cors';
import router from './src/routes/router';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
app.locals.io = io;

AppDataSource.initialize().then(() => {
    console.log('Connect database success');
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', router);

server.listen(4000, () => {
    console.log('Server is running');
});
