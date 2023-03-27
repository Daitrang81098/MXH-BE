import {AppDataSource} from "../data-source";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Like from "../models/Like";

class PostService {
    private postRepository
    private commentRepository
    private likeRepository

    constructor() {
        this.postRepository = AppDataSource.getRepository(Post)
        this.commentRepository = AppDataSource.getRepository(Comment)
        this.likeRepository = AppDataSource.getRepository(Like)
    }
    findPost = async (idPost) => {
        let posts = await this.postRepository.find({
            relations: ['account', 'comment', 'comment.account'],
            order: {
                time: "DESC"
            }
        })
        let o = [];
        posts.map(it => {
            o.push(it.idPost)
        });
        let new_arr = o.filter(item => !idPost.includes(item));

        idPost.map(it => {
            for (let i = 0; i < posts.length; i++) {
                if (it === posts[i].idPost) {
                    this.postRepository.update({idPost: it}, {isLike: 2})
                }
            }
        })
        new_arr.map(it => {
            posts.map(post => {
                if (it === post.idPost) {
                    this.postRepository.update({idPost: it}, {isLike: 1})
                }
            })

        })
        return this.postRepository.find({
            relations: ['account','comment','comment.account','like','like.account'],
            order: {
                time: "DESC"
            }
        });
    }
    // Chưa dùng nhé
    findPosts = async (idFriends, idAccount, idPost) => {
        let posts = [];
        for (let i = 0; i < idFriends.length; i++) {
            let friend = await this.findByIdAccounts(idFriends[i]);
            friend.map(it => {
                posts.push(it)
            })
        }
        let account = await this.findByIdAccountss(idAccount);
        account.map(it => {
            posts.push(it)
        });
        let status = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .leftJoinAndSelect("post.comment", "comment")
            .where(`account.idAccount != ${idAccount}`)
            .andWhere('status = "public"')
            .orderBy("post.time", "DESC")
            .getMany();
        status.map(it => {
            posts.push(it)
        });
        idPost.map(it => {
            posts.map(post => {
                if (it === post.idPost) {
                    this.postRepository.update({idPost: it}, {isLike: 2})
                }
            })
        })
        return posts
    }
    // Chưa dùng nhé
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
    // Chưa dùng nhé
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
            .innerJoinAndSelect("post.comment", "comment")
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
            .leftJoinAndSelect("post.like", "like")
            // .innerJoinAndSelect("post.comment","comment")
            // .orderBy("comment.time", "DESC")
            .where(`post.idPost = ${idPost}`)
            .getOne()
        if (!post) {
            return "can not findByIdPost"
        }
        return post
    }
    createPost = async (value) => {
        let post = await this.postRepository.save(value);
        if (!post) {
            return 'Can not createPost'
        }
        return await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`idPost = ${post.idPost}`)
            .getMany()
    }
    findByIdPost = async (idPost) => {
        let post = await this.postRepository.findOneBy({idPost: idPost});
        if (!post) {
            return null;
        }
        return post;
    }

    findByContent = async (search) => {
        let post = await this.postRepository.createQueryBuilder("post")
            .innerJoinAndSelect("post.account", "account")
            .where(`content like '%${search}%'`)
            .orderBy("time", "DESC")
            .getMany()
        if (!post) {
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
        let post = await this.postRepository.createQueryBuilder("post")
            .leftJoinAndSelect("post.comment", "comment")
            .leftJoinAndSelect("post.like", "like")
            .where(`post.idPost = ${idPost}`)
            .getOne()
        if (!post) {
            return null
        }
        await Promise.all(post.comment.map((commentPost) => {
        this.commentRepository.remove(commentPost);
        }));
        await Promise.all(post.like.map((likePost) => {
             this.likeRepository.remove(likePost);
        }));

         await this.postRepository.remove(post);
    }
}
export default new PostService();
