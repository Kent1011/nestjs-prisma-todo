import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsMobilePhone('zh-TW')
  mobile: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  hash: string;

  hashRt?: string;
}
