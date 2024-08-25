import { IPagination } from "../interfaces/pagination.interface";
import { ITask, ITaskDTO } from "../interfaces/task.interface";

export class TaskMapper {
  public static toDTO(data: ITask): ITaskDTO {
    return {
      task: data.task,
      isDone: data.isDone,
      _id: data._id,
    };
  }
  public static toListDTO(data: ITask[]): ITaskDTO[] {
    return data.map((item) => this.toDTO(item));
  }
  public static toListResponseDTO(
    data: IPagination<ITask>,
  ): IPagination<ITaskDTO> {
    return {
      items: this.toListDTO(data.items),
      totalPages: data.totalPages,
      limit: data.limit,
      page: data.page,
      totalCount: data.totalCount,
    };
  }
}
