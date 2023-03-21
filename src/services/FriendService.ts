import {AppDataSource} from "../data-source";
import {Friend} from "../models/Friend";

class FriendService {
    private friendRepository

    constructor() {
        this.friendRepository = AppDataSource.getRepository(Friend)
    }

    checkFriend = async (thisId,thatId) =>{
        let sql = `select * from friend where (idSender = ${thisId} and idReceiver = ${thatId}) or  (idSender = ${thatId} and idReceiver = ${thisId})`
        let select = await this.friendRepository.query(sql);
        let friend = select[0]
        if(!friend){
            return "Add Friend"
        } else {
            if (thisId == friend.idSender){
                if(friend.status === "Friends"){
                    return {
                        friend:friend,
                        status:"Friends"}
                }
                return {
                    friend:friend,
                    status:"Cancel Request"}
            }
            if(friend.status === "Friends"){
                return {
                    friend:friend,
                    status:"Friends"}
            }
            return {
                friend:friend,
                status:"Confirm"}
        }
    }

    createFriend = async (values) => {
        await this.friendRepository.save(values);
        let res = await this.friendRepository.findOneBy({idSender:values.idSender, idReceiver:values.idReceiver});
        return {
            friend:res,
            status:"Cancel Request"}
    }

    edit = async (id) => {
        await this.friendRepository.update({id:id}, {status:"Friends"});
        let res = await this.friendRepository.findOneBy({id:id});
        return {
            friend:res,
            status:"Friends"};
    }

    remove = async (id) => {
        await this.friendRepository.delete({id:id});
        return "Add Friend";
    }

}


export default new FriendService();
