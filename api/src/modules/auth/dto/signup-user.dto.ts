import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { error_messages } from 'src/common/constants/error-messages';

export class SignupUserDto {
  @IsString()
  @MinLength(3, { message: error_messages.MIN_CHARACTERS('Name', 3) })
  @MaxLength(50, { message: error_messages.MAX_CHARACTERS('Name', 50) })
  name: string;

  @IsNumber()
  @Min(1, { message: error_messages.MIN_NUMBER('Age', 1) })
  @Max(100, { message: error_messages.MAX_NUMBER('Age', 50) })
  age: number;

  @IsEmail({}, { message: error_messages.INVALID_EMAIL })
  @MaxLength(50, { message: error_messages.MAX_CHARACTERS('Email', 50) })
  email: string;

  @IsString()
  @MinLength(8, { message: error_messages.MIN_CHARACTERS('Password', 8) })
  @MaxLength(20, { message: error_messages.MAX_CHARACTERS('Password', 20) })
  password: string;
}
