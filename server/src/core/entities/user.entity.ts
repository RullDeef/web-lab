import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  TUTOR = 'tutor',
  STUDENT = 'student',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_roles',
  })
  role: UserRole;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  stripCredentials() {
    const { login, password, ...result } = this;
    return result;
  }
}
