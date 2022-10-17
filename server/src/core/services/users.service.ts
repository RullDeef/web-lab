import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { Repository } from 'typeorm';
import { EditUserDto } from '../dto/edit-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  private readonly saltRounds = 10;

  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(user: Partial<User>) {
    this.logger.log('create', user);

    const u = this.repository.create(user);
    return await this.repository.save(u);
  }

  async findAll() {
    this.logger.log('findAll');

    return await this.repository.find();
  }

  async findById(id: number) {
    this.logger.log('findById id=' + id);

    return await this.repository.findOneBy({ id });
  }

  async edit(id: number, data: EditUserDto) {
    this.logger.log('edit id=' + id);
    this.logger.log('data:', data);

    if (data.password !== undefined) {
      data.password = await hash(data.password, this.saltRounds);
    }

    const user = await this.repository.findOneByOrFail({ id });
    return await this.repository.save({ ...user, ...data });
  }

  async delete(id: number) {
    this.logger.log('delete id=' + id);

    return await this.repository.delete({ id });
  }

  async findByLogin(login: string) {
    this.logger.log('findByLogin login=' + login);

    return await this.repository.findOneBy({ login });
  }
}
