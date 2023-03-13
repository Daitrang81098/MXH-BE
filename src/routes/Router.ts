import {Router} from "express";
import {PostRouter} from "./PostRouter";

export const router = Router()
router.use('/posts',PostRouter);