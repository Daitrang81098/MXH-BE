import {Router} from "express";
import AccountController from "../controllers/AccountController";
export const accountRouter = Router();
accountRouter.post('/login', AccountController.login);
accountRouter.get('/findById/:id', AccountController.findByIdUser);
accountRouter.post('/register', AccountController.register);


