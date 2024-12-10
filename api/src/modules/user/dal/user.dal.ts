import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SignupUserDto } from 'src/modules/auth/dto/signup-user.dto';
import { ErrorDal } from '../../../common/dal/error.dal';

@Injectable()
export class UserDal {
  constructor(
    private prisma: PrismaService,
    private errorDal: ErrorDal,
  ) {}

  async findByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { email, deletedAt: null },
      });
    } catch (error) {
      this.errorDal.handleError(error);
      console.log('.');
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.user.findUnique({
        where: { id: id.toString() },
      });
    } catch (error) {
      this.errorDal.handleError(error);
    }
  }

  async createUser(user: SignupUserDto) {
    try {
      return await this.prisma.user.create({ data: user });
    } catch (error) {
      this.errorDal.handleError(error);
    }
  }
}