import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard'; 
import { jwtConstants } from './constant'; 
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { PasswordService } from './password/password.service';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,                
      secret: jwtConstants.secret,  
      signOptions: { expiresIn: '1000s' }, 
    }),
  ],
  controllers: [AuthController],      
  providers: [
    AuthService,                   
    UserService,
    PasswordService, 
    {
      provide: APP_GUARD,            
      useClass: AuthGuard,
    },
  ],
  exports:[PasswordService]
})
export class AuthModule {}
