import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Account } from './Account';
import { createConnection } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn({ type: 'timestamp' })
    time: Date;

    @ManyToOne(() => Account, (account) => account.sentMessages)
    sender: Account;

    @ManyToOne(() => Account, (account) => account.receivedMessages)
    receiver: Account;
}
