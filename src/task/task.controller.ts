import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  @Post()
  create(@Body() task: TaskDto){

  }

  @Get('/:id')
  findById(@Param('id') id:string) {

  }
}
