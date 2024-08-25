export interface ITask {
  _id: string;
  task: string;
  isDone: boolean;
  userId: string;
}

export interface IUpdateTask {
  task?: string;
  isDone?: boolean;
}

export interface ITaskDTO extends Pick<ITask, "_id" | "task" | "isDone"> {}
export interface ICreateTask extends Pick<ITask, "task"> {}
