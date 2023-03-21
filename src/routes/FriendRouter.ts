import {Router} from "express";
import friendController from "../controllers/FriendController";

export const friendRouter = Router();
friendRouter.get('/search',friendController.checkFriend);
friendRouter.post('/',friendController.addFriend);
friendRouter.put('/:id',friendController.updateFriend);
friendRouter.delete('/:id',friendController.removeFriend);








