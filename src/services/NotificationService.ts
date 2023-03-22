import {AppDataSource} from "../data-source";
import {Notification} from "../models/Notification";
import {Account} from "../models/Account";

class NotificationService {
    private notificationRepository
    private accountRepository

    constructor() {
        this.notificationRepository = AppDataSource.getRepository(Notification)
        this.accountRepository = AppDataSource.getRepository(Account)
    }

    createNotification = async (values) => {
        let res = await this.notificationRepository.save(values);
        if (!res){
            return "Error"
        }
        return "Add success"
    }

    getNotification = async (idReceiver) => {
        let sql =`SELECT * FROM mxh.notification n join mxh.account a on idSender=idAccount where n.idReceiver = ${idReceiver} ;`
        let notifications = await this.notificationRepository.query(sql);
        return notifications;
    }

}


export default new NotificationService();
