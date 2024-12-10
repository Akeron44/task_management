import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class TaskUnauthorizedException extends HttpException {
  constructor() {
    super('You are not authorized to access this task', HttpStatus.FORBIDDEN);
  }
}

export class TaskAlreadyDeletedException extends HttpException {
  constructor(id: string) {
    super(`Task with ID ${id} is already deleted`, HttpStatus.BAD_REQUEST);
  }
}
