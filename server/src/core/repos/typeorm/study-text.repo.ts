import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyText } from '../../models/study-text.model';
import { StudyTextRepository } from '../interfaces/study-text.repo';
import { StudyTextEntity } from './entities/study-text.entity';

@Injectable()
export class TypeORMStudyTextRepository implements StudyTextRepository {
  private readonly logger = new Logger(TypeORMStudyTextRepository.name);

  constructor(
    @InjectRepository(StudyTextEntity)
    private readonly repo: Repository<StudyTextEntity>,
  ) {}

  async save(text: StudyText): Promise<StudyText> {
    let entity = this.repo.create(StudyTextEntity.fromModel(text));
    entity = await this.repo.save(entity);
    return entity.toModel();
  }

  async existsById(id: number): Promise<boolean> {
    return (await this.repo.countBy({ id })) == 1;
  }

  async findAll(): Promise<StudyText[]> {
    const texts = await this.repo.find();
    return texts.map((t) => t.toModel());
  }

  async findById(id: number): Promise<StudyText> {
    try {
      const text = await this.repo.findOneByOrFail({ id });
      return text.toModel();
    } catch (e) {
      this.logger.log(`exception: ${e}`);
      throw new NotFoundException();
    }
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id });
  }
}
