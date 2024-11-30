import { Controller, HttpCode, HttpStatus, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard, Public } from './auth.guard';
import { ProfileDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async signIn(@Body() user: Record<string, any>) {
    console.log(user)
    const token = await this.authService.signIn(user.name, user.password);
    console.log(token)
    return { message: 'Login realizado com sucesso', token };
  }

  @UseGuards(AuthGuard)
  @Post("profile")
  async updateProfile(@Body() data: ProfileDto, @Request() request: Request) {
    return await this.authService.updateProfile(data, request["user"]);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Request() req: Request) {
    return req['user'];
  }
}
