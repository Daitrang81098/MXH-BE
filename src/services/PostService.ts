import {AppDataSource} from "../data-source";
import Post from "../models/Post";

 class PostService {
    private postRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
    }

    findPost = async () => {
        let sql = `select * from post`
        let post = await this.postRepository.query(sql);
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    createPost = async (value) => {
        let post = await this.postRepository.save(value);
        if (!post) {
            return 'Can not createPost'
        }
        return post;
    }

}

export default new PostService();