import { Prisma } from '@prisma/client';

export const prismaLogging = async (
  params: Prisma.MiddlewareParams,
  next: (params: Prisma.MiddlewareParams) => Promise<any>,
) => {
  const action = `${params.model}.${params.action}`;

  const before = Date.now();
  const result = await next(params);
  const usageTime = Date.now() - before;

  console.log(`${action} - ${usageTime}ms`);

  return result;
};
