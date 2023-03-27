import {AppDataSource} from "../data-source";
import Like from "../models/Like";



class LikeService {
    private likeRepository

    constructor() {
        this.likeRepository = AppDataSource.getRepository(Like)
    }
    getLike = async (account) => {
        let post = []
        post=[];
        let res = await this.likeRepository.find(
            {relations: ['account','post'],
                where:{"account.idAccount":account}
            })
        res.map(it=>{post.push(it.post.idPost)})
        if (!post){
            return "Error"
        }
        return post
    }


    like = async (values) => {
        let res = await this.likeRepository.save(values);
        if (!res){
            return "Error"
        }
        return res
    }

    unLike = async (post,account) => {
        let sql = `select idLike from mxh.like where accountIdAccount = ${account} and postIdPost = ${post}`
        let like = await this.likeRepository.query(sql)
        let res = await this.likeRepository.delete({idLike:like[0].idLike});
        if (!res){
            return "Error"
        }
        return "Ok"
    }

}


export default new LikeService();
