import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'User email', required: true, type: String
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User password', required: true, type: String })
  readonly password: string;
}
