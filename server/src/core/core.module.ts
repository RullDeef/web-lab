import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { StudyGroupsController } from './controllers/study-groups.controller';
import { StudyTextsController } from './controllers/study-texts.controller';
import { UsersController } from './controllers/users.controller';
import { StudyGroupEntity } from './repos/typeorm/entities/study-group.entity';
import { StudyTextEntity } from './repos/typeorm/entities/study-text.entity';
import { UserEntity } from './repos/typeorm/entities/user.entity';
import { AuthService } from './services/auth/auth.service';
import { UserRepository } from './repos/interfaces/user.repo';
import { TypeORMUserRepository } from './repos/typeorm/user.repo';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { LocalStrategy } from './services/auth/local.strategy';
import { StudyGroupsService } from './services/study-groups.service';
import { StudyTextService as StudyTextsService } from './services/study-texts.service';
import { UsersService } from './services/users.service';
import { StudyGroupRepository } from './repos/interfaces/study-group.repo';
import { TypeORMStudyGroupRepository } from './repos/typeorm/study-group.repo';
import { StudyTextRepository } from './repos/interfaces/study-text.repo';
import { TypeORMStudyTextRepository } from './repos/typeorm/study-text.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, StudyTextEntity, StudyGroupEntity]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeORMUserRepository,
    },
    {
      provide: StudyGroupRepository,
      useClass: TypeORMStudyGroupRepository,
    },
    {
      provide: StudyTextRepository,
      useClass: TypeORMStudyTextRepository,
    },
    UsersService,
    StudyTextsService,
    StudyGroupsService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [
    UsersController,
    StudyTextsController,
    StudyGroupsController,
    AuthController,
  ],
  exports: [
    UsersService,
  ]
})
export class CoreModule {}
