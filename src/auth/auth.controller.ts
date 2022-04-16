import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  PublicRouter,
} from '../common/decorators';
import { RefreshTokenGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRouter()
  @Post('signup')
  async signUp(@Body() dto: SignUpDto) {
    return await this.authService.signUp(dto);
  }

  @PublicRouter()
  @Post('login')
  async signIn(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @Post('logout')
  async logout(@GetCurrentUserId() id: string) {
    return await this.authService.logout(id);
  }

  @PublicRouter()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refreshToken(@GetCurrentUser() user: any) {
    console.log(user);

    return await this.authService.refreshToken(user?.sub, user?.refreshToken);
  }
}
