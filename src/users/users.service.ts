import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRsp, SignupRsp, User } from './interfaces/user';
import { CreateUserDTO } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PasswordHasherService } from './auth/password-hasher/password-hasher.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UsersService {
  // tslint:disable-next-line:no-empty
  constructor(
    @InjectModel('Users')
    private readonly userModel: Model<User>,
    private passwordHasher: PasswordHasherService,
    private jwtService: JwtService
  ) { }
  async signup(doc: CreateUserDTO): Promise<SignupRsp> {

    // Check if user exists
    const user = await this.userModel.findOne({ email: doc.email })
    if (user) throw new UnauthorizedException(`User ${doc.email} already exists.`)

    // Encrypt the password
    const encryptedPassword = await this.passwordHasher.hashPassword(doc.password)

    const newUser = new this.userModel({ email: doc.email, password: encryptedPassword });
    await newUser.save()
    return { email: newUser.email }
  }

  async login(doc: CreateUserDTO): Promise<LoginRsp> {
    // Verify user account
    const user = await this.userModel.findOne({ email: doc.email })
    if (!user) throw new UnauthorizedException(`User with email: ${doc.email} does NOT exist.`)

    // Verify password
    const verify = await this.passwordHasher.comparePassword(doc.password, user.password)
    if (!verify) throw new UnauthorizedException(`Invalid password.`)

    // Generate JWT
    const token = await this.jwtService.signAsync({ id: user.id, email: user.email })
    return { token }
  }
}
