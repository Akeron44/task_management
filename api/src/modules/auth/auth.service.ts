import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthHelper } from './helpers/auth.helper';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserDal } from '../user/dal/user.dal';
import { error_messages } from 'src/common/constants/error-messages';

@Injectable()
export class AuthService {
  constructor(
    private authHelper: AuthHelper,
    private userDal: UserDal,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userDal.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException(error_messages.INVALID_CREDENTAILS);
    }

    await this.authHelper.handlePasswordVerification(user.password, password);

    const token = await this.authHelper.generateToken({
      id: parseInt(user.id),
      name: user.name,
      email: user.email,
      age: user.age,
    });

    const {
      password: userPassword,
      deletedAt,
      updatedAt,
      createdAt,
      ...results
    } = user;

    return { ...results, token };
  }

  async signup(signupUserDto: SignupUserDto) {
    const { email, password } = signupUserDto;
    const user = await this.userDal.findByEmail(email);

    if (user) {
      throw new UnprocessableEntityException(error_messages.EMAIL_IN_USE);
    }

    const result = await this.authHelper.generateHashedPassword(password);
    const userDto: SignupUserDto = {
      ...signupUserDto,
      password: result,
    };

    const newUser = await this.userDal.createUser(userDto);
    const token = await this.authHelper.generateToken({
      id: parseInt(newUser.id),
      name: newUser.name,
      email: newUser.email,
      age: newUser.age,
    });

    const {
      password: userPassword,
      deletedAt,
      createdAt,
      updatedAt,
      ...results
    } = newUser;

    return { ...results, token };
  }
}