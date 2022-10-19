import { User, UserRole } from '../../../models/user.model';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
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

  toModel(): User {
    return this as User;
  }

  static fromModel(user: User) {
    const ent = new UserEntity();

    ent.id = user.id;
    ent.first_name = user.first_name;
    ent.last_name = user.last_name;
    ent.role = user.role;
    ent.login = user.login;
    ent.password = user.password;

    return ent;
  }
}
