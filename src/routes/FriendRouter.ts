import {Router} from "express";
import friendController from "../controllers/FriendController";

export const friendRouter = Router();
friendRouter.post('',friendController.checkFriend)






