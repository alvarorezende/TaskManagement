import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { GetAllTasksParams, TaskDto, TaskRouteParameters } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }

  @Get('/:id')
  async findById(@Param('id') id:string): Promise<TaskDto> {
    return this.taskService.findById(id);
  }

  @Get()
  async findAll(@Query() params: GetAllTasksParams): Promise<TaskDto[]> { 
    return this.taskService.findAll(params);
  }

  @Put()
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  delete(@Param('id') id:string) {
    return this.taskService.delete(id);
  }
}
