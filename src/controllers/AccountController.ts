import AccountService from "../services/AccountService";
import {Request, Response} from "express";

class AccountController {
    private accountService;

    constructor() {
        this.accountService = AccountService;
    }

    register = async (req: Request, res: Response) => {
        try {
            let account = await this.accountService.register(req.body)
            res.status(201).json(account)
        } catch (e) {
            console.log(1)
            res.status(500).json(e.message)
        }
    }
    login = async (req: Request, res: Response) => {
        try {
            let account = {
                username: req.body.username,
                password: req.body.password
            }
            let response = await this.accountService.checkUser(account);
            res.status(200).json(response)
        } catch (e) {
            res.status(500).json(e.message)
        }

    }
    findByIdUser = async (req: Request, res: Response) => {
        try {
            let id = req.params.id
            let account = await this.accountService.findById(id);
            res.status(200).json(account)
        } catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new AccountController;
