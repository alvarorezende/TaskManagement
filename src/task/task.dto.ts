import { IsEnum, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export class TaskDto {
  @IsUUID()
  id: string;

  @MinLength(3)
  @MaxLength(256)
  title: string;

  description: string;

  @IsEnum(TaskStatusEnum)
  status: string;
  
  expirationDate: Date;
}

export interface GetAllTasksParams {
  title: string;
  status: string;
}