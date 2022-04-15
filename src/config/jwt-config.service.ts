import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtConfig = {
  secret: string;
  expiresIn: string | number;
};

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  get atConfig(): JwtConfig {
    return {
      secret: this.configService.get<string>('JWT_AT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_AT_EXPIRES_IN'),
    };
  }

  get rtConfig(): JwtConfig {
    return {
      secret: this.configService.get<string>('JWT_RT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_RT_EXPIRES_IN'),
    };
  }
}
