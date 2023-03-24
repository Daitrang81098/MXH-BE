import {Message} from '../models/Message';
import {Account} from '../models/Account';
import {Socket} from 'socket.io';
import {AppDataSource} from "../data-source";
import {Request,Response} from "express";

export class MessageService {
    private messageRepository;
    constructor() {
        this.messageRepository = AppDataSource.getRepository(Message)
    }
    async sendMessage(sender: Account, receiver: Account, content: string): Promise<Message> {

        const newMessage = new Message();
        newMessage.content = content;
        newMessage.sender = sender;
        newMessage.receiver = receiver;

        return await this.messageRepository.save(newMessage);
    }


//chức năng của nó là lấy tất cả các tin nhắn giữa hai người dùng theo thứ tự thời gian tăng dần.
//     async getMessages(senderId: string, receiverId: string): Promise<Message[]> {
//         return await this.messageRepository.createQueryBuilder("message")
//             .leftJoinAndSelect("message.sender", "sender")
//             .leftJoinAndSelect("message.receiver", "receiver")
//             .where("(sender.id = :senderId AND receiver.id = :receiverId) OR (sender.id = :receiverId AND receiver.id = :senderId)", {
//                 senderId: senderId,
//                 receiverId: receiverId
//             })
//             .orderBy("message.time", "ASC")
//             .getMany();
//     }
    getMessages = async (req: Request)=>{
        if(req.query.senderId !== undefined && req.query.receiverId !== undefined){
            let sql = `select content,time,senderIdAccount from message where (senderIdAccount = '${req.query.senderId}' and receiverIdAccount = '${req.query.receiverId}') or
                (senderIdAccount = '${req.query.receiverId}' and receiverIdAccount = '${req.query.senderId} ') order by (time) ASC`
            let content = await  this.messageRepository.query(sql)
            return content
        }

    }

    async emitMessage(socket: Socket, message: Message) {
        socket.emit('message', message);
    }
}
