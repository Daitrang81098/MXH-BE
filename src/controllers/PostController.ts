import {Request, Response} from "express";
import PostService from "../services/PostService";
import {postRouter} from "../routes/PostRouter";

class PostController {
    private postService;

    constructor() {
        this.postService = PostService;
    }
}











export default new PostController();