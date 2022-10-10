import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudyText } from "../entities/study-text.entity";

@Injectable()
export class StudyTextService {
    private readonly logger = new Logger(StudyTextService.name);

    constructor(
        @InjectRepository(StudyText)
        private repository: Repository<StudyText>
    ) { }

    async create(studyText: Partial<StudyText>) {
        this.logger.log('create', studyText);

        const text = this.repository.create(studyText);
        return await this.repository.save(text);
    }

    async findAll() {
        this.logger.log('findAll');

        return await this.repository.find()
    }

    async findById(id: number) {
        this.logger.log('findById');

        return await this.repository.findOneBy({ id });
    }

    async delete(id: number) {
        this.logger.log('delete id=' + id);

        return await this.repository.delete({ id });
    }
}
