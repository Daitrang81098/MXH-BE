import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import {Account} from "./Account";

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    idComment: number;
    @Column()
    content: string;
    @Column({ default: "1"})
    time: string;
    @Column()
    idAccount: number;
    @Column({default: "1"})
    image: string;
    @ManyToOne(() => Post, (post) => post.comment)
    post: Post;
    @ManyToOne(() => Account, (account) => account.comment)
    account: Account;
}
