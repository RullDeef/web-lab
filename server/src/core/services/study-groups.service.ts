import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudyGroupDto } from "../dto/create-study-group.dto";
import { StudyGroup } from "../entities/study-group.entity";
import { User } from "../entities/user.entity";

@Injectable()
export class StudyGroupsService {
    private readonly logger = new Logger(StudyGroupsService.name);

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(StudyGroup)
        private readonly studyGroupRepository: Repository<StudyGroup>
    ) { }

    async create(dto: CreateStudyGroupDto) {
        this.logger.log('create', dto);

        ///TODO: dto validation
        const tutor = await this.userRepository.findOneByOrFail({ id: dto.tutor_id });
        const students = await Promise.all(dto.students_ids.map(id => this.userRepository.findOneByOrFail({ id })));

        const group = this.studyGroupRepository.create({ title: dto.title, tutor, students });
        return await this.studyGroupRepository.save(group);
    }

    async findAll() {
        this.logger.log('findAll');

        return await this.studyGroupRepository.find();
    }

    async findById(id: number) {
        this.logger.log('findById');

        return await this.studyGroupRepository.findOneBy({ id });
    }

    async delete(id: number) {
        this.logger.log('delete id=' + id);

        return await this.studyGroupRepository.delete({ id });
    }
}