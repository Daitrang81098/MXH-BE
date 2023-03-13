import "reflect-metadata"
import { DataSource } from "typeorm";
import Post from "./models/Post";
import Comment from "./models/Comment";
import Like from "./models/Like";
import {Account} from "./models/Account";


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "mxh",
    synchronize: true,
    entities: [Post,Comment,Like,Account]
})
