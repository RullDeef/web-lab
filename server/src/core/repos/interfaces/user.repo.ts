import { User } from '../../models/user.model';

export interface UserRepository {
  save(user: User): Promise<User>;

  existsById(id: number): Promise<boolean>;
  existsByLogin(login: string): Promise<boolean>;

  findAll(): Promise<User[]>;
  findById(id: number): Promise<User>;
  findByLogin(login: string): Promise<User>;

  delete(id: number): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
