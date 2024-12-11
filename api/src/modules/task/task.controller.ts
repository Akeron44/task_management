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

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.taskService.create(createTaskDto, req.user['id']);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.taskService.findAll(req.user['id']);
  }

  @Get('mystats')
  getMyStats(@Req() req: Request) {
    return this.taskService.getMyTaskStats(req.user['id']);
  }
  @Get('stats')
  getStats(@Req() req: Request) {
    return this.taskService.getTaskStats(req.user['id']);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.findOne(id, req.user['id']);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request,
  ) {
    return this.taskService.update(id, req.user['id'], updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.remove(id, req.user['id']);
  }

  @Patch(':id/restore')
  restore(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.restore(id, req.user['id']);
  }

  // Optional: Add hard delete endpoint if needed
  @Delete(':id/hard')
  hardDelete(@Param('id') id: string, @Req() req: Request) {
    return this.taskService.hardDelete(id, req.user['id']);
  }
}
