import { User, UserRole } from '../../core/entities/user.entity';
import { BaseFactory } from './base-factory';
import {
  randFirstName,
  randLastName,
  randPassword,
  randUserName,
} from '@ngneat/falso';
import { rand } from '@ngneat/falso';
import { hashSync } from 'bcrypt';

export class UserFactory extends BaseFactory<Partial<User>> {
  create(): Partial<User> {
    return {
      first_name: randFirstName(),
      last_name: randLastName(),
      role: rand(Object.values(UserRole)),
      login: randUserName() + randUserName(),
      password: hashSync(randPassword(), 2),
    };
  }
}
