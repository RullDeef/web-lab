import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStudyGroupDto } from '../dto/create-study-group.dto';
import { StudyGroup } from '../models/study-group.model';
import { FilterOptions } from '../repos/interfaces/filter-options.interface';
import { StudyGroupRepository } from '../repos/interfaces/study-group.repo';
import { UserRepository } from '../repos/interfaces/user.repo';

@Injectable()
export class StudyGroupsService {
  private readonly logger = new Logger(StudyGroupsService.name);

  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(StudyGroupRepository)
    private readonly studyGroupRepository: StudyGroupRepository,
  ) {
    this.logger.log('constructor');
  }

  async create(dto: CreateStudyGroupDto) {
    this.logger.log(`create dto=${JSON.stringify(dto)}`);

    try {
      const group = new StudyGroup();

      group.title = dto.title;
      group.tutor = await this.userRepository.findById(dto.tutor_id);
      group.students = await Promise.all(
        dto.students_ids.map(this.userRepository.findById),
      );

      return await this.studyGroupRepository.save(group);
    } catch (e) {
      this.logger.log(`caught exception: ${e}`);

      throw new NotFoundException();
    }
  }

  async findAll(filterOpts: FilterOptions) {
    this.logger.log(`findAll filterOpts=${JSON.stringify(filterOpts)}`);

    return this.studyGroupRepository.findFiltered(filterOpts);
  }

  async findById(id: number) {
    this.logger.log(`findById id=${id}`);

    return this.studyGroupRepository.findById(id);
  }

  async delete(id: number) {
    this.logger.log(`delete id=${id}`);

    return this.studyGroupRepository.delete(id);
  }
}
