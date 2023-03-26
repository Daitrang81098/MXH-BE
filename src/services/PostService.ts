import {AppDataSource} from "../data-source";
import Post from "../models/Post";

class PostService {
    private postRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
    }

    findPost = async () => {
        let post = await this.postRepository.find({
            relations: ['account','comment','comment.account'],
            order: {
                time: "DESC"
            }
        })
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    findPosts = async (idFriends,idAccount) => {
        let posts = [];
        for(let i=0; i<idFriends.length; i++){
            let a = await this.findByIdAccounts(idFriends[i]);
            a.map(it=>{posts.push(it)})
        }
        let b = await this.findByIdAccountss(idAccount);
        b.map(it=>{posts.push(it)});
        let c = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.comment", "comment")
            .where(`account.idAccount != ${idAccount}`)
            .andWhere('status = "public"')
            .orderBy("post.time", "DESC")
            .getMany();
        c.map(it=>{posts.push(it)});
        return posts
    }

    findByIdAccounts = async (idAccount) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.comment", "comment")
            .where(`account.idAccount = ${idAccount}`)
            .andWhere('status = "Friends"')
            .orderBy("post.time", "DESC")
            .getMany()
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    findByIdAccountss = async (idAccount) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.comment", "comment")
            .where(`account.idAccount = ${idAccount}`)
            .orderBy("post.time", "DESC")
            .getMany()
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    findByIdAccount = async (idAccount) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`account.idAccount = ${idAccount}`)
            .orderBy("post.time", "DESC")
            .getMany()
        if (!post) {
            return 'Can not findPost'
        }
        return post;
    }

    findBy = async (idPost) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account","account")
            // .innerJoinAndSelect("post.comment","comment")
            // .orderBy("comment.time", "DESC")
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

    findByContent = async (search)=> {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`content like '%${search}%'`)
            .orderBy("time", "DESC")
            .getMany()
        if(!post){
            return "Can not find by name";
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
