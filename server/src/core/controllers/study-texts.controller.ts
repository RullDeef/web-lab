import { Body, Controller, Delete, Get, Inject, Logger, Param, Post } from "@nestjs/common";
import { CreateStudyTextDto } from "../dto/create-study-text.dto";
import { StudyTextService } from "../services/study-texts.service";

@Controller('texts')
export class StudyTextsController {
    private readonly logger = new Logger(StudyTextsController.name);

    constructor(
        private service: StudyTextService
    ) { }

    @Post()
    async create(@Body() body: CreateStudyTextDto) {
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
