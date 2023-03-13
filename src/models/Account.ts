import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Post from "./Post";
import Comment from "./Comment";
import Like from "./Like";

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    idAccount: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column({default: "DaiS"})
    name: string;
    @Column({type: "date", default: "01/01/2023"})
    birthday: string;
    @Column({default: "1"})
    avatar: string;
    @Column({default: "man"})
    german: string;
    @Column({default: "Dong Anh"})
    address: string;
    @OneToMany(() => Post, (post) => post.account)
    post: Post[];
    @OneToMany(() => Comment, (comment) => comment.account)
    comment: Comment[];
    @OneToMany(() => Like, (like) => like.account)
    like: Like[];
}
