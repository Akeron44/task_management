import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskDal } from './dal/task.dal';
import { Priority, TaskStatus } from '@prisma/client';
import {
  TaskNotFoundException,
  TaskUnauthorizedException,
} from '../../common/exceptions/task.exception';
import { error_messages } from 'src/common/constants/error-messages';

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

  findAll(userId: string) {
    return this.taskDal.findAll({
      where: { userId },
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

  async getTaskStats(userId: string) {
    const tasks = await this.taskDal.findAll({
      where: { userId },
    });

    return {
      total: tasks.length,
      byStatus: {
        [TaskStatus.PENDING]: tasks.filter(
          (t) => t.status === TaskStatus.PENDING,
        ).length,
        [TaskStatus.IN_PROGRESS]: tasks.filter(
          (t) => t.status === TaskStatus.IN_PROGRESS,
        ).length,
        [TaskStatus.COMPLETED]: tasks.filter(
          (t) => t.status === TaskStatus.COMPLETED,
        ).length,
        [TaskStatus.CANCELLED]: tasks.filter(
          (t) => t.status === TaskStatus.CANCELLED,
        ).length,
      },
      byPriority: {
        [Priority.LOW]: tasks.filter((t) => t.priority === Priority.LOW).length,
        [Priority.MEDIUM]: tasks.filter((t) => t.priority === Priority.MEDIUM)
          .length,
        [Priority.HIGH]: tasks.filter((t) => t.priority === Priority.HIGH)
          .length,
      },
    };
  }

  async restore(id: string, userId: string) {
    // First check if the task belongs to the user
    const task = await this.taskDal.findOne({ id });
    if (task && task.userId !== userId) {
      throw new TaskNotFoundException(id);
    }
    return this.taskDal.restore({ id });
  }

  // Optional: Add hard delete if needed
  async hardDelete(id: string, userId: string) {
    await this.findOne(id, userId);
    return this.taskDal.hardDelete({ id });
  }
}
