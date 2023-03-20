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
    @Column({ default: "01/01/2023"})
    birthday: string;
    @Column({default: "https://kenh14cdn.com/203336854389633024/2020/11/13/photo1605266767169-16052667674792035596777.jpg"})
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
