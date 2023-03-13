
import {AppDataSource} from "../data-source";
import Post from "../models/Post";
export default class PostService{
private postRepository
constructor() {
    this.postRepository =AppDataSource.getRepository(Post)
}
}