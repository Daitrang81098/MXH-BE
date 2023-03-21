import {Request, Response} from "express";
import PostService from "../services/PostService";
import FriendService from "../services/FriendService";

class FriendController {
    private friendService;

    constructor() {
        this.friendService = FriendService;
    }

    checkFriend = async (req: Request, res: Response) => {
        try{
            let thisId = req.body.thisId;
            let thatId = req.body.thatId;
            console.log(req.body)
            let response = await this.friendService.checkFriend(thisId,thatId)

            res.status(200).json(response)
        }catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new FriendController();

