import {Router} from "express";
import postController from "../controllers/PostController";

export const postRouter = Router();
postRouter.put('/:idPost',postController.editPost)
postRouter.delete('/:idPost',postController.deletePost)




