import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import {Account} from "./Account";

@Entity()
export default class Like {
    @PrimaryGeneratedColumn()
    idLike: number;
    @Column()
    idAccount: number;
    @ManyToOne(() => Post, (post) => post.like)
    post: Post;
    @ManyToOne(()=>Account,(account)=>account.like)
    account : Account;
}
