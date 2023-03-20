import {AppDataSource} from "../data-source";
import Post from "../models/Post";

class PostService {
    private postRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
    }

    findPost = async () => {
        let post = await this.postRepository.find({
            relations: ['account','comment'],
            order: {
                time: "DESC"
            }
        })
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    findByIdAccount = async (idAccount) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`account.idAccount = ${idAccount}`)
            .orderBy("time", "DESC")
            .getMany()
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }
    findBy = async (idPost) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account","account")
            .innerJoinAndSelect("post.comment","comment")
            .orderBy("comment.time", "DESC")
            .where(`post.idPost = ${idPost}`)
            .getOne()
        if(!post) {
            return "can not findByIdPost"
        }
        return post
    }

    createPost = async (value) => {
        let post = await this.postRepository.save(value);
        if (!post) {
            return 'Can not createPost'
        }
        return await this.findByIdAccount(post.account);
    }
    findByIdPost = async (idPost) => {
        let post = await this.postRepository.findOneBy({idPost: idPost});
        if (!post) {
            return null;
        }
        return post;
    }

    updatePost = async (idPost, newPost) => {
        let posts = await this.postRepository.findOneBy({idPost: idPost})
        if (!posts) {
            return null
        }
        await this.postRepository.update({idPost: idPost}, newPost);
        return await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`idPost = ${idPost}`)
            .getMany()
    }
    removePost = async (idPost) => {
        let posts = await this.postRepository.findOneBy({idPost: idPost});
        if (!posts) {
            return null
        }
        return this.postRepository.delete({idPost: idPost});
    }
}


export default new PostService();
