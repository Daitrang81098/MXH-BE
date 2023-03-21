import {Router} from "express";
import {postRouter} from "./PostRouter";
import {accountRouter} from "./AccountRouter";
import {friendRouter} from "./FriendRouter";
import {notificationRouter} from "./NotificationRouter";

export const router = Router()
router.use('/posts',postRouter);
router.use("/accounts", accountRouter);
router.use("/friends", friendRouter);
router.use("/notifications", notificationRouter);

