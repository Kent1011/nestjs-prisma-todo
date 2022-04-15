import {
  IsMobilePhone,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsMobilePhone('zh-TW')
  mobile: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
