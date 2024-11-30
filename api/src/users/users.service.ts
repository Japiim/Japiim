import { Injectable } from "@nestjs/common";
import { User } from './users.entity';
import { Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from "src/auth/auth.dto";

export type Login = any;

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) 
        private usersRepository: Repository<User>,
    ) {}

    async findOne(name: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({name});
      }

      async updateProfile(user: User, data: ProfileDto) {
        const currentUser = await this.usersRepository.findOne({
          where: {id: user.id}
        });
        
        currentUser.name = data.name;
    
        await this.usersRepository.save(currentUser);
        return currentUser;
      }
}