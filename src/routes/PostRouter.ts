import {Router} from "express";
import postController from "../controllers/PostController";

export const postRouter = Router();

postRouter.post('/',postController.addPost);
postRouter.get('/',postController.getPost);
postRouter.get('/:idAccount',postController.findByIdAccount);
postRouter.get('/findById/:id',postController.findByIdPost);
postRouter.put('/:idPost',postController.editPost);
postRouter.delete('/:idPost',postController.deletePost);




