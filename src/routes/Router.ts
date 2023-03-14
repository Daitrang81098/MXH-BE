import {Router} from "express";
import {postRouter} from "./PostRouter";
import {accountRouter} from "./AccountRouter";
export const router = Router()
router.use('/posts',postRouter);
router.use("/accounts", accountRouter);
