import {Request, Response} from "express";
import PostService from "../services/PostService";

 class PostController {
    private postService;

    constructor() {
        this.postService = PostService;
    }
    editPost = async (req: Request, res: Response)=> {
        try {
            let idPost = req.params.idPost;
            let newPost = req.body;
            let posts = await this.postService.updatePost(idPost,newPost);
            res.status(200).json(posts)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
     deletePost = async (req: Request, res: Response)=> {
         try {
             let idPost = req.params.idPost;
             let posts = await this.postService.removePost(idPost);
             res.status(200).json(posts)
         } catch (e) {
             res.status(500).json(e.message)
         }
     }
}
export default new PostController();
