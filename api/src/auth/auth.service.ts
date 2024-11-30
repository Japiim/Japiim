import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';
import { ProfileDto } from './auth.dto';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,private usersService: UserService, private passwordService: PasswordService) {}

  async signIn(name, password): Promise<{ access_token: string }> {
    console.log(name, password)
    const user = await this.usersService.findOne(name);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (
      !(await this.passwordService.comparePassword(password, user.password))
    ) {
      throw new UnauthorizedException('Usuário ou senha incorretos');
    }
    const payload = { sub: user.id, name:user.name, role:user.role};
    return {
      access_token: await this.jwtService.signAsync(payload), 
    };
  }
  async updateProfile(profileDto: ProfileDto, user: User) {
    return this.usersService.updateProfile(user, profileDto);
  }
}