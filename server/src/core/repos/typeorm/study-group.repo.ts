import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyGroup } from '../../models/study-group.model';
import { FilterOptions } from '../interfaces/filter-options.interface';
import { StudyGroupRepository } from '../interfaces/study-group.repo';
import { StudyGroupEntity } from './entities/study-group.entity';

@Injectable()
export class TypeORMStudyGroupRepository implements StudyGroupRepository {
  private readonly logger = new Logger(TypeORMStudyGroupRepository.name);

  constructor(
    @InjectRepository(StudyGroupEntity)
    private readonly repo: Repository<StudyGroupEntity>,
  ) {}

  async save(group: StudyGroup): Promise<StudyGroup> {
    try {
      let entity = this.repo.create(StudyGroupEntity.fromModel(group));
      entity = await this.repo.save(entity);
      return entity.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new ConflictException();
    }
  }

  async existsById(id: number): Promise<boolean> {
    return (await this.repo.countBy({ id })) == 1;
  }

  async findAll(): Promise<StudyGroup[]> {
    const groups = await this.repo.find();
    return groups.map((g) => g.toModel());
  }

  async findById(id: number): Promise<StudyGroup> {
    try {
      const group = await this.repo.findOneByOrFail({ id });
      return group.toModel();
    } catch (e) {
      this.logger.log(`exception: e`);
      throw new NotFoundException();
    }
  }

  async findFiltered(opts: FilterOptions): Promise<StudyGroup[]> {
    const groups = await this.repo.find({ relations: { tutor: true, }, skip: opts.skip, take: opts.limit });
    return groups.map((g) => g.toModel());
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
