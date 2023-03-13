import {AppDataSource} from "../data-source";
import {Account} from "../models/Account";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {SECRET} from "../middlerware/Auth";

class AccountService {
    private accountRepository;

    constructor() {
        this.accountRepository = AppDataSource.getRepository(Account);
    }

    register = async (user) => {
        let userCheck = await this.accountRepository.findOneBy({username: user.username})
        if (!userCheck) {
            user.userPassword = await bcrypt.hash(user.userPassword, 10);
            return this.accountRepository.save(user);
        }
        return 'Username registered';
    }
}

