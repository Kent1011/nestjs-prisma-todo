import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsMobilePhone('zh-TW')
  mobile: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
