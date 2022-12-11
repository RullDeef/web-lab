import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { User } from '../../models/user.model';
import { UserRepository } from '../interfaces/user.repo';
import { FilterOptions } from '../interfaces/filter-options.interface';

@Injectable()
export class TypeORMUserRepository implements UserRepository {
  private readonly logger = new Logger(TypeORMUserRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {
    this.logger.log('construct');
  }

  async save(user: User) {
    this.logger.log(`save user=${JSON.stringify(user)}`);

    if (user.login === '') {
      this.logger.error('user login must not be empty');
      throw new BadRequestException();
    }

    if (await this.existsByLogin(user.login)) {
      this.logger.error(`user with given login (${user.login}) exists`);
      throw new ConflictException();
    }

    try {
      let entity = UserEntity.fromModel(user);
      entity = this.repo.create(entity);
      entity = await this.repo.save(entity);
      return entity.toModel();
    } catch (e) {
      this.logger.log(`caught exception: ${e}`);
      throw new ConflictException();
    }
  }

  async existsById(id: number): Promise<boolean> {
    return (await this.repo.countBy({ id })) == 1;
  }

  async existsByLogin(login: string): Promise<boolean> {
    return (await this.repo.countBy({ login })) == 1;
  }

  async findAll() {
    const users = await this.repo.find();
    return users.map((u) => u.toModel());
  }

  async findById(id: number) {
    try {
      const user = await this.repo.findOneByOrFail({ id });
      return user.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new NotFoundException();
    }
  }

  async findByLogin(login: string): Promise<User> {
    try {
      const user = await this.repo.findOneByOrFail({ login });
      return user.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new NotFoundException();
    }
  }

  async findFiltered(opts: FilterOptions): Promise<User[]> {
    const users = await this.repo.find({ skip: opts.skip, take: opts.limit });
    return users.map((u) => u.toModel());
  }

  async delete(id: number) {
    await this.repo.delete({ id });
  }
}
