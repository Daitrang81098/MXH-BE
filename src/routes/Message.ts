import express from 'express';
import { MessageController } from '../controllers/MessageController';

const router = express.Router();
const messageController = new MessageController();

router.get('/messages', messageController.getAllMessages.bind(messageController));
router.get('/messages/:id', messageController.getMessageById.bind(messageController));
router.post('/messages', messageController.createMessage.bind(messageController));

export default router;
