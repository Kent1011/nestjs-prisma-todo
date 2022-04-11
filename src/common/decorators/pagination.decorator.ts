import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

/**
 * 從 Query String 取得分頁設定的 decorator
 *
 * Query String keys
 * - ps: page size
 * - p: page index
 *
 * Usage:
 * - @Page()
 * - @Page(n): 將預設的 page size 設定為 n，如果 query string 沒有帶入 ps 的設定時，會套用這邊的 n，n可不帶（預設20）
 *
 * Return:
 * {@link PageQueryParam}
 */
export const Pagination = createParamDecorator(
  (defaultPageSize: number, ctx: ExecutionContext): PageQueryParam => {
    const { ps: pageSize, p: pageIndex } = ctx
      .switchToHttp()
      .getRequest<Request>().query;

    if (!pageIndex)
      return {
        enabled: false,
        pageIndex: 1,
        pageSize: 20,
      };

    const defaultSize =
      defaultPageSize && defaultPageSize > 0 ? defaultPageSize : 20;

    const paginationParams = {
      enabled: true,
      pageSize: pageSize ? +pageSize : defaultSize,
      pageIndex: +pageIndex,
    };

    return paginationParams;
  },
);

export type PageQueryParam = {
  enabled: boolean;
  pageSize: number;
  pageIndex: number;
};
