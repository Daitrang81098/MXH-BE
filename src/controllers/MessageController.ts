import { Request, Response } from 'express';
import { MessageService } from '../services/MessageService';

export class MessageController {
    private messageService: MessageService;

    constructor() {
        this.messageService = new MessageService();
    }

    async getAllMessages(req: Request, res: Response) {
        const messages = await this.messageService.getAllMessages();
        res.json(messages);
    }

    async getMessageById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const message = await this.messageService.getMessageById(id);
        res.json(message);
    }

    async createMessage(req: Request, res: Response) {
        const { content, senderId, receiverId } = req.body;
        const message = await this.messageService.createMessage(content, senderId, receiverId);
        res.json(message);
    }
}
export default new MessageController
