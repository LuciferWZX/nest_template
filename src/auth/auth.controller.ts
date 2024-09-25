import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dtos/signIn.dto';
import { AuthGuard } from '../guards/auth.guard';
import { SignUpDto } from '../dtos/signUp.dto';
import { Public } from './decorator';
import { IUser } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() signInDto: SignUpDto) {
    return this.authService.signUp(signInDto);
  }
  @Get('profile')
  getProfile(@Request() req) {
    return req.user as IUser;
  }
}
