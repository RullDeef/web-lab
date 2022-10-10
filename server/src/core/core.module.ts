import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyGroupsController } from './controllers/study-groups.controller';
import { StudyTextsController } from './controllers/study-texts.controller';
import { UsersController } from './controllers/users.controller';
import { StudyGroup } from './entities/study-group.entity';
import { StudyText } from './entities/study-text.entity';
import { User } from './entities/user.entity';
import { StudyGroupsService } from './services/study-groups.service';
import { StudyTextService as StudyTextsService } from './services/study-texts.service';
import { UsersService } from './services/users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            User, StudyText, StudyGroup
        ])
    ],
    providers: [
        UsersService,
        StudyTextsService,
        StudyGroupsService
    ],
    controllers: [
        UsersController,
        StudyTextsController,
        StudyGroupsController
    ]
})
export class CoreModule {}
