import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'study_groups' })
export class StudyGroup {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'tutor_id' })
    tutor: User;

    @ManyToMany(() => User)
    @JoinTable({
        name: 'study_groups_users',
        joinColumn: {
            name: 'group_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'student_id',
            referencedColumnName: 'id'
        }
    })
    students: User[];

    @CreateDateColumn()
    created_at: Date;
}
