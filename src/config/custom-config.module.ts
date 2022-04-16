import { Global, Module } from '@nestjs/common';
import { JwtConfigService } from './jwt-config.service';

@Global()
@Module({
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class CustomConfigModule {}
