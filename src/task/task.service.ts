import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, Like, Repository } from 'typeorm';
import { GetAllTasksParams, TaskDto, TaskStatusEnum } from './task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async create(task: TaskDto) {
    const newTask: TaskEntity = {
      title: task.title,
      description: task.description,
      status: TaskStatusEnum.TO_DO,
      expirationDate: task.expirationDate,
    }

    const createdTask = await this.taskRepository.save(newTask);

    return this.mapEntity(createdTask);
  }

  async findById(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    return this.mapEntity(task);
  }

  async findAll(params: GetAllTasksParams): Promise<TaskDto[]> { 
    const searchParams: FindOptionsWhere<TaskEntity> = {}

    if (params.title) {
      searchParams.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchParams.status = Like(`%${params.status}%`);
    }

    const tasks = await this.taskRepository.find({ 
      where: searchParams
    });

    return tasks.map(task => this.mapEntity(task));
  }

  async update(id: string, task: TaskDto) {
    const foundTask = await this.taskRepository.findOne({ where: { id }  });

    if (!foundTask) { 
      throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    await this.taskRepository.update(id, this.mapDto(task));
  }

  async delete(id: string) {
    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
    }
  }

  private mapEntity(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: TaskStatusEnum[taskEntity.status],
      expirationDate: taskEntity.expirationDate,
    }
  }

  private mapDto(taskDto: TaskDto): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status.toString(),
      expirationDate: taskDto.expirationDate,
    }
  }
}
