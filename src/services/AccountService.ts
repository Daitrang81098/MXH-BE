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

    checkUser = async (user) => {
        let userCheck = await this.accountRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return 'User is not exit';
        } else {
            let passwordCompare = await bcrypt.compare(user.password, userCheck.password);
            if (!passwordCompare) {
                return 'Password is wrong'
            } else {
                let payload = {
                    idAccount: userCheck.idAccount,
                    username: userCheck.username,
                }
                return {
                    idAccount: userCheck.idAccount,
                    username: userCheck.username,
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: 3000000
                    })
                }
            }
        }

    }
    register = async (account) => {
        console.log(222222222,account)
        let userCheck = await this.accountRepository.findOneBy({username: account.username})
        if (!userCheck) {
            account.password = await bcrypt.hash(account.password, 10);
            return this.accountRepository.save(account);
        }
        return 'Username registered';
    }
    findById = async (id)=> {
        let account = await this.accountRepository.findOneBy({idUser:id});
        if(!account){
            return null;
        }
        return account;
    }
}
export default new AccountService;
