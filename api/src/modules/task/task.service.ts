import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDal } from './dal/task.dal';
import {
  TaskNotFoundException,
  TaskUnauthorizedException,
} from '../../common/exceptions/task.exception';

@Injectable()
export class TaskService {
  constructor(private readonly taskDal: TaskDal) {}

  create(createTaskDto: CreateTaskDto, userId: string) {
    return this.taskDal.create({
      ...createTaskDto,
      user: {
        connect: { id: userId },
      },
    });
  }

  findAll() {
    return this.taskDal.findAll({
      where: { deletedAt: null },
    });
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskDal.findOne({ id });
    if (!task) {
      throw new TaskNotFoundException(id);
    }
    if (task.userId !== userId) {
      throw new TaskUnauthorizedException();
    }
    return task;
  }

  async update(id: string, userId: string, updateTaskDto: UpdateTaskDto) {
    try {
      await this.findOne(id, userId);
      return this.taskDal.update({
        where: { id },
        data: updateTaskDto,
      });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.taskDal.softDelete({ id });
  }

  async restore(id: string, userId: string) {
    // First check if the task belongs to the user
    const task = await this.taskDal.findOne({ id });
    if (task && task.userId !== userId) {
      throw new TaskNotFoundException(id);
    }
    return this.taskDal.restore({ id });
  }

  async hardDelete(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.taskDal.hardDelete({ id });
  }
}
