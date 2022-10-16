import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { StudyGroupsController } from './controllers/study-groups.controller';
import { StudyTextsController } from './controllers/study-texts.controller';
import { UsersController } from './controllers/users.controller';
import { StudyGroup } from './entities/study-group.entity';
import { StudyText } from './entities/study-text.entity';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './services/auth/jwt.strategy';
import { LocalStrategy } from './services/auth/local.strategy';
import { StudyGroupsService } from './services/study-groups.service';
import { StudyTextService as StudyTextsService } from './services/study-texts.service';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, StudyText, StudyGroup]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
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
})
export class CoreModule {}
