import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../../common/guards/jwt.guard';
import { Request } from 'express';
import { controller_path } from 'src/common/constants/controller-path';

@Controller(controller_path.TASKS.INDEX)
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.create(createTaskDto, req.user['id']);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(controller_path.TASKS.TASK_ID)
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.findOne(id, req.user['id']);
  }

  @Patch(controller_path.TASKS.TASK_ID)
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.taskService.update(id, req.user['id'], updateTaskDto);
  }

  @Delete(controller_path.TASKS.TASK_ID)
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.remove(id, req.user['id']);
  }

  @Patch(controller_path.TASKS.RESTORE)
  restore(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.restore(id, req.user['id']);
  }

  @Delete(controller_path.TASKS.HARD_DELETE)
  hardDelete(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.hardDelete(id, req.user['id']);
  }
}
