
import { Column } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";
import { Entity } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    first_name: string;
    @Column()
    last_name: string;
    @Column({
        unique: true
    })
    email: string;
    @Column(
    //     {
    //     select:false
    // }
    )
    password: string;
    @Column()
    is_ambassador: boolean;
}