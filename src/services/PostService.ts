
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
     updatePost = async (idPost, newPost) => {
         let posts = await this.postRepository.findOneBy({idPost: idPost})
         if (!posts) {
             return null
         }
         return await this.postRepository.update({idPost: idPost}, newPost)
     }
     removePost = async (idPost) => {
         let posts = await this.postRepository.findOneBy({idPost : idPost});
         if(!posts){
             return null
         }
         return this.postRepository.delete({idPost : idPost});
     }
}


export default new PostService();
