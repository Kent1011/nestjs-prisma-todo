export interface Todo {
  id: number;
  title: string;
  subTitle?: string;
  dateCreated: Date;
  dateUpdated: Date;
  isFinished: boolean;
  dateFinished?: Date;
  deadline?: Date;
}
