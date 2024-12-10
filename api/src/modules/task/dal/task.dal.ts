import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Task, Prisma } from '@prisma/client';
import {
  TaskNotFoundException,
  TaskAlreadyDeletedException,
} from '../../../common/exceptions/task.exception';

@Injectable()
export class TaskDal {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.TaskOrderByWithRelationInput;
  }): Promise<Task[]> {
    const { skip, take, where, orderBy } = params;
    return this.prisma.task.findMany({
      skip,
      take,
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy,
    });
  }

  async findOne(where: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return this.prisma.task.findFirst({
      where: {
        ...where,
        deletedAt: null,
      },
    });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    const { where, data } = params;
    try {
      const task = await this.findOne(where);
      if (!task) {
        throw new TaskNotFoundException(where.id as string);
      }
      return this.prisma.task.update({
        data,
        where,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new TaskNotFoundException(where.id as string);
        }
      }
      throw error;
    }
  }

  async softDelete(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    try {
      const task = await this.findOne(where);
      if (!task) {
        throw new TaskNotFoundException(where.id as string);
      }
      if (task.deletedAt) {
        throw new TaskAlreadyDeletedException(where.id as string);
      }
      return this.prisma.task.update({
        where,
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new TaskNotFoundException(where.id as string);
        }
      }
      throw error;
    }
  }

  async restore(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        ...where,
        deletedAt: { not: null },
      },
    });
    if (!task) {
      throw new Error('Deleted task not found');
    }
    return this.prisma.task.update({
      where,
      data: {
        deletedAt: null,
      },
    });
  }

  async hardDelete(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({
      where,
    });
  }
}
