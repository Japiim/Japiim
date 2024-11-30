import { Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./users.entity";  
import { InjectRepository } from "@nestjs/typeorm";
import { UsersDTO } from "./DTO/users.dto";
import { Public } from "src/auth/auth.guard";
import { PasswordService } from "src/auth/password/password.service";

@Controller("users")
export class IndexController {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>, private passwordService: PasswordService
    ) {}

    @Public()
    @Get()
    async getUsersList() {
        return await this.usersRepository.find();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {  
        const user = await this.usersRepository.findOneBy({id});  
        if (!user) {
            throw new NotFoundException("Usuário não encontrado.");
        }
        return user;
    }
    
    @Public()
    @Post("signup")
    async registerUser(@Body() UsersDTO: UsersDTO) {
        const user = new User();
        user.name = UsersDTO.name;
        user.password= await this.passwordService.hashPassword(UsersDTO.password);
        user.role = UsersDTO.role;

        try{
            await this.usersRepository.save(user)
        }
        catch(error){
            throw new InternalServerErrorException("Erro ao inserir usuario")
        }
        return user;
    }
}