
import {AppDataSource} from "../data-source";
import Post from "../models/Post";
 class PostService{
private postRepository
constructor() {
    this.postRepository =AppDataSource.getRepository(Post)
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