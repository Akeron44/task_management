import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { error_messages } from 'src/common/constants/error-messages';

export class LoginUserDto {
  @IsEmail({}, { message: error_messages.INVALID_EMAIL })
  @MaxLength(50, { message: error_messages.MAX_CHARACTERS('Email', 50) })
  email: string;

  @IsString()
  @MinLength(8, { message: error_messages.MIN_CHARACTERS('Password', 8) })
  @MaxLength(20, { message: error_messages.MAX_CHARACTERS('Password', 20) })
  password: string;
}
