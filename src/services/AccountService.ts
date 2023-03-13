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
            user.userPassword = await bcrypt.hash(user.password, 10);
            return this.accountRepository.save(user);
        }
        return 'Username registered';
    }
    checkUser = async (user) => {
        let userCheck = await this.accountRepository.findOneBy({username: user.username})
        if (!userCheck) {
            return 'User is not exit';
        } else {
            let passwordCompare = await bcrypt.compare(user.userPassword, userCheck.userPassword);
            if (!passwordCompare) {
                return 'Password is wrong'
            } else {
                let payload = {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                }
                return {
                    idUser: userCheck.idUser,
                    username: userCheck.username,
                    token: jwt.sign(payload, SECRET, {
                        expiresIn: 3000000
                    })
                }
            }
        }

    }
    findById = async (id)=> {
        let account = await this.accountRepository.findOneBy({idUser:id});
        if(!account){
            return null;
        }
        return account;
    }
}
export default AccountService
