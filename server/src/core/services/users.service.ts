import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { User } from '../models/user.model';
import { FilterOptions } from '../repos/interfaces/filter-options.interface';
import { UserRepository } from '../repos/interfaces/user.repo';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly saltRounds = 10;

  constructor(
    @Inject(UserRepository)
    private readonly repository: UserRepository,
  ) {}

  async create(user: User) {
    user.password = await this.encryptPassword(user.password);
    this.logger.log('create', user);

    return this.repository.save(user);
  }

  async findAll(opts: FilterOptions) {
    this.logger.log(`findAll opts=${JSON.stringify(opts)}`);

    return this.repository.findFiltered(opts);
  }

  async findById(id: number) {
    this.logger.log(`findById id=${id}`);

    return this.repository.findById(id);
  }

  async edit(id: number, data: Partial<User>) {
    this.logger.log(`edit id=${id}`);

    if (!(await this.repository.existsById(id))) {
      this.logger.log(`user with id=${id} not found`);
      throw new NotFoundException();
    }

    if (data.password !== undefined) {
      data.password = await this.encryptPassword(data.password);
    }
    this.logger.log('data:', data);

    if (
      data.login !== undefined &&
      (await this.repository.existsByLogin(data.login))
    ) {
      // check that login matches unique constraint
      if (id != (await this.repository.findByLogin(data.login)).id) {
        throw new ConflictException();
      }
    }

    let user = await this.repository.findById(id);
    user = { ...user, ...data };
    return this.repository.save(user);
  }

  async delete(id: number) {
    this.logger.log(`delete id=${id}`);

    return this.repository.delete(id);
  }

  async findByLogin(login: string) {
    this.logger.log(`findByLogin login=${login}`);

    return this.repository.findByLogin(login);
  }

  private async encryptPassword(password: string): Promise<string> {
    return hash(password, this.saltRounds);
  }

  async checkPassword(password: string, hashed: string): Promise<boolean> {
    return compare(password, hashed);
  }
}
