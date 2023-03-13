import {Router} from "express";
import {accountRouter} from "./AccountRouter";

export const router = Router();
router.use("/account", accountRouter);
