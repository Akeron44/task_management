import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dto/signup-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { controller_path } from '../../common/constants/controller-path';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(controller_path.AUTH.LOG_IN)
  login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post(controller_path.AUTH.SIGN_UP)
  signup(@Body() signupUserDto: SignupUserDto) {
    return this.authService.signup(signupUserDto);
  }
}
