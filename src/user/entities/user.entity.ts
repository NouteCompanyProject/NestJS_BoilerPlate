import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name:'users',
})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    password: string;
}

export class UserFields {
    email: string;
    password: string;
}