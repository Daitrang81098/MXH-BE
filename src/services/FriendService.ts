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
            if (thisId === friend.idSender){
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

}


export default new FriendService();
