import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyTextsController } from './controllers/study-texts.controller';
import { UsersController } from './controllers/users.controller';
import { StudyText } from './entities/study-text.entity';
import { User } from './entities/user.entity';
import { StudyTextService as StudyTextsService } from './services/study-texts.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, StudyText
        ])
    ],
    providers: [
        UsersService,
        StudyTextsService
    ],
    controllers: [
        UsersController,
        StudyTextsController
    ]
})
export class CoreModule {}
