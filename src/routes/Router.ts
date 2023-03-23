// router.ts
import { Router } from "express";
import { postRouter } from "./PostRouter";
import { accountRouter } from "./AccountRouter";
import { friendRouter } from "./FriendRouter";
import { notificationRouter } from "./NotificationRouter";
import { commentRouter } from "./CommentRouter";
import { MessageRouter } from "./Message";

export const router = Router();

router.use("/posts", postRouter);
router.use("/accounts", accountRouter);
router.use("/comments", commentRouter);
router.use("/friends", friendRouter);
router.use("/notifications", notificationRouter);
router.use("/messages", MessageRouter);

export default router;
