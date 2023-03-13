import {Router} from "express";
import {postRouter} from "./PostRouter";

export const router = Router()
router.use('/posts',postRouter);