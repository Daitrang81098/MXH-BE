import {Router} from "express";
import postController from "../controllers/PostController";

export const postRouter = Router();

postRouter.post('/',postController.addPost);
postRouter.get('/',postController.getPost);



