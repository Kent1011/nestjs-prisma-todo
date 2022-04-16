import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsMobilePhone('zh-TW')
  mobile: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  hash: string;

  hashRt?: string;
}
