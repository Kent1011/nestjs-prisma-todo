import { SetMetadata } from '@nestjs/common';

export const PUBLIC_ROUTER_KEY = 'isPublicRouter';
export const PublicRouter = () => SetMetadata(PUBLIC_ROUTER_KEY, true);
