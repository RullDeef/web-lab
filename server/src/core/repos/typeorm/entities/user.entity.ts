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
    const user = new User();

    user.id = this.id;
    user.first_name = this.first_name;
    user.last_name = this.last_name;
    user.role = this.role;
    user.login = this.login;
    user.password = this.password;

    return user;
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
