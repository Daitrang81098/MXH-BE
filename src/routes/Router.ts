import {Router} from "express";
import {postRouter} from "./PostRouter";
import {accountRouter} from "./AccountRouter";
import {friendRouter} from "./FriendRouter";
import {commentRouter} from "./CommentRouter";
export const router = Router()
router.use('/posts',postRouter);
router.use("/accounts", accountRouter);
router.use('/comments',commentRouter)

router.use("/friends", friendRouter);
