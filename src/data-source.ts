import "reflect-metadata"
import { DataSource } from "typeorm";
import {Account} from "./models/Account";
import Comment from "./models/Comment";
import Like from "./models/Like";
import Post from "./models/Post";



export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "mxh",
    synchronize: true,
    entities: [Account,Comment,Like,Post]
})
