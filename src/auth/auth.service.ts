import * as bcrypt from 'bcrypt';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtConfigService } from '../config/jwt-config.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async signUp(dto: SignUpDto) {
    const existUser = await this.usersService.findOne({ mobile: dto.mobile });
    if (existUser) throw new HttpException('User exist.', 400);

    const hash = await this.hashData(dto.password);
    const user = await this.usersService.create({
      mobile: dto.mobile,
      email: dto.email,
      hash,
    });

    const tokens = await this.getTokens(user.id, user.mobile);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const { hash: pwdHash, hashRt, ...resUser } = user;
    return { ...resUser, ...tokens };
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto.mobile, dto.password);

    const tokens = await this.getTokens(user.id, user.mobile);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    const { hash, hashRt, ...resUser } = user;
    return { ...resUser, ...tokens };
  }

  async logout(userId: string) {
    const user = await this.usersService.update(userId, { hashRt: null });
    return { success: !!user };
  }

  async refreshToken(userId: string, refreshToken: string) {
    const user = await this.usersService.findOne({ id: userId });

    if (!user || !user.hashRt) throw new ForbiddenException('Access Denied');

    const isMatch = await bcrypt.compare(refreshToken, user.hashRt);
    if (!isMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.mobile);
    this.updateRefreshToken(userId, tokens.refreshToken);

    const { hash, hashRt, ...userRes } = user;
    return { ...userRes, ...tokens };
  }

  private async validateUser(mobile: string, pwd: string): Promise<any> {
    const user = await this.usersService.findOne({ mobile });

    if (!user) throw new ForbiddenException('Access Denied');

    const isMatch = await bcrypt.compare(pwd, user.hash);
    if (!isMatch) throw new ForbiddenException('Access Denied');

    return user;
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.usersService.update(userId, { hashRt: hash });
  }

  private async getTokens(
    userId: string,
    mobile: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          mobile,
        },
        { ...this.jwtConfigService.atConfig },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          mobile,
        },
        { ...this.jwtConfigService.rtConfig },
      ),
    ]);

    return { accessToken, refreshToken };
  }

  private async hashData(data: string): Promise<string> {
    return await bcrypt.hash(data, 10);
  }
}
