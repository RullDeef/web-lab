import { Body, Controller, Delete, Get, Logger, Param, Post } from "@nestjs/common";
import { CreateStudyGroupDto } from "../dto/create-study-group.dto";
import { StudyGroupsService } from "../services/study-groups.service";

@Controller('study-groups')
export class StudyGroupsController {
    private readonly logger = new Logger(StudyGroupsController.name);

    constructor(
        private readonly service: StudyGroupsService
    ) { }

    @Post()
    async create(@Body() body: CreateStudyGroupDto) {
        this.logger.log('create', body);

        return await this.service.create(body);
    }

    @Get()
    async getAll() {
        this.logger.log('getAll');

        return await this.service.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        this.logger.log('getById id=' + id);

        return await this.service.findById(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        this.logger.log('delete id=' + id);

        return await this.service.delete(id);
    }
}
