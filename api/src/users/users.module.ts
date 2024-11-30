import { Module } from '@nestjs/common';
import { IndexController } from './index.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserService } from './users.service';
import { PasswordService } from 'src/auth/password/password.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [IndexController],
    providers: [UserService, PasswordService],
    exports: [UserService, TypeOrmModule],
})
export class UsersModule {}