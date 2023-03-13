import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import Like from "./Like";
import Comment from "./Comment";
import {Account} from "./Account";

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    idPost: number;
    @Column()
    idAccount : number;
    @Column({default: "public"})
    status: string;
    @Column()
    content: string;
    @Column({ default: "1/1/2023"})
    time: string;
    @Column({default: "1"})
    image: string;
    @OneToMany(() => Comment, (comment) => comment.post)
    comment: Comment[]
    @OneToMany(() => Like, (like) => like.post)
    like: Like[]
    @ManyToOne(()=>Account,(account)=>account.post)
    account : Account;
}
