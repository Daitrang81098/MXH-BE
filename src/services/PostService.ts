
import {AppDataSource} from "../data-source";
import Post from "../models/Post";

 class PostService {
    private postRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
    }

    findPost = async () => {
        let posts = await this.postRepository.find(
            {relations: ['account'],
            order:{
                time: "DESC"
            }});
        if (!posts) {
            return 'Can not findPost'
        }
        return posts;
    }


    createPost = async (value) => {
        let post = await this.postRepository.save(value);
        if (!post) {
            return 'Can not createPost'
        }
        return post;
    }

     findByIdPost = async (idPost)=> {
         let post = await this.postRepository.findOneBy({idPost:idPost});
         if(!post){
             return null;
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
