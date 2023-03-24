import {Router} from "express";
import {postRouter} from "./PostRouter";
import {accountRouter} from "./AccountRouter";
import {friendRouter} from "./FriendRouter";
import {notificationRouter} from "./NotificationRouter";
import {commentRouter} from "./CommentRouter";
import {likeRouter} from "./LikeRouter";

export const router = Router()
router.use('/posts',postRouter);
router.use("/accounts", accountRouter);
router.use('/comments',commentRouter)
router.use("/friends", friendRouter);
router.use("/notifications", notificationRouter);
router.use("/likes", likeRouter);

