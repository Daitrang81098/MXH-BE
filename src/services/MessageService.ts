import { getRepository } from 'typeorm';
import { Message } from '../models/Message';
import { Socket } from 'socket.io';
import {AppDataSource} from "../data-source";

class MessageService {
    private messageRepository
    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }

    async getMessages(senderId: number, receiverId: number): Promise<Message[]> {
        return await this.messageRepository.find({
            where: [
                { sender: { id: senderId }, receiver: { id: receiverId } },
                { sender: { id: receiverId }, receiver: { id: senderId } },
            ],
        });
    }

    async saveMessage(
        content: string,
        senderId: number,
        receiverId: number,
        socket: Socket
    ) {
        const message =
        message.content = content;
        message.sender = senderId;
        message.receiver = receiverId;
        const savedMessage = await this.messageRepository.save(message);

        // Emit the new message to the sender and receiver using Socket.IO
        socket.to(`user:${senderId}`).emit('new_message', savedMessage);
        socket.to(`user:${receiverId}`).emit('new_message', savedMessage);

        return savedMessage;
    }
}

export default new MessageService();
