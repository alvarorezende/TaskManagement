import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';

@Module({
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {
  create(task: TaskDto) {
    
  }
}
