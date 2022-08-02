import { Controller, Post, Body } from '@nestjs/common';
import { User, SignupRsp, LoginRsp } from './interfaces/user';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Get } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/guards/role-guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Post('signup')
  async signUp(@Body() user: CreateUserDTO): Promise<SignupRsp> {
    return await this.userService.signup(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDTO): Promise<LoginRsp> {
    return await this.userService.login(user);
  }


  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  async profile(@Request() req) {
    return req.user
  }
}
