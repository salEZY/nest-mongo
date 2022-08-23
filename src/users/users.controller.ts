import { Controller, Post, Body } from '@nestjs/common';
import { User, SignupRsp, LoginRsp } from './interfaces/user';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { Get } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './auth/guards/role-guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Post('signup')
  @ApiCreatedResponse({ description: 'User has created an account' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async signUp(@Body() user: CreateUserDTO): Promise<SignupRsp> {
    return await this.userService.signup(user);
  }

  @Post('login')
  @ApiCreatedResponse({ description: 'User has logged in' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async login(@Body() user: CreateUserDTO): Promise<LoginRsp> {
    return await this.userService.login(user);
  }


  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  @UseGuards(RolesGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'User profile OK' })
  @ApiUnauthorizedResponse({ description: 'Unathorized' })
  async profile(@Request() req) {
    return req.user
  }
}
