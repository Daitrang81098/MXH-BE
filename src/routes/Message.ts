import {Router} from 'express';
import {MessageController} from '../controllers/MessageController';

const messageRouter = Router();
const messageController = new MessageController();

messageRouter.post('/', messageController.sendMessage.bind(messageController));
messageRouter.get('/', messageController.getMessages.bind(messageController));

export default messageRouter;
