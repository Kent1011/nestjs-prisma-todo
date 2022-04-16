import { PageQueryParam } from '../../common/decorators';

export type FindTasksDto = {
  page?: PageQueryParam;
  type?: FindTasksType;
};

export type FindTasksType = 'all' | 'onlyProcessing' | 'onlyFinished';

export const defaultFindTasksDto: FindTasksDto = {
  page: { enabled: false, pageIndex: 0, pageSize: 0 },
  type: 'onlyProcessing',
};
