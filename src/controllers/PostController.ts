import {Request, Response} from "express";
import PostService from "../services/PostService";
import {postRouter} from "../routes/PostRouter";

class PostController {
    private postService;

    constructor() {
        this.postService = PostService;
    }

    getPost = async (req: Request, res: Response) => {
        try {
            let response = await PostService.findPost();
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }



    addPost = async (req: Request, res: Response) => {
        try {
            let response = await PostService.createPost(req.body);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}










export default new PostController();