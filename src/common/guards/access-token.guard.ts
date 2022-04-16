import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ACCESS_TOKEN_STRATEGY_NAME } from '../../auth/strategies';
import { PUBLIC_ROUTER_KEY } from '../decorators';

@Injectable()
export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY_NAME) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublicRouter = this.reflector.getAllAndOverride(PUBLIC_ROUTER_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return isPublicRouter ? true : super.canActivate(context);
  }
}
