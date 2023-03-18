import {Router} from "express";
import friendController from "../controllers/FriendController";

export const friendRouter = Router();
friendRouter.get('',friendController.checkFriend)






