import { PageQueryParam } from '../decorators';

export interface Pagination {
  size: number;
  index: number;
  dataAmount: number;
  pageAmount: number;
}

export interface PaginationRecords<T> {
  records: T[];
  pagination: Pagination;
}

export const paginationOf = <T = any>(
  page: PageQueryParam,
  dataAmount: number,
  records: T[],
): PaginationRecords<T> => {
  return page.enabled
    ? {
        records,
        pagination: {
          size: page.pageSize,
          index: page.pageIndex,
          dataAmount,
          pageAmount: Math.ceil(dataAmount / page.pageSize),
        },
      }
    : {
        records,
        pagination: {
          size: dataAmount,
          index: 1,
          dataAmount,
          pageAmount: 1,
        },
      };
};
