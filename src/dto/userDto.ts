import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";
import { currentRole } from "src/enums/user.enum";

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  full_name: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEnum(currentRole)
  current_role: string;

  @IsNotEmpty()
  @IsString()
  current_company: string;

  @IsNotEmpty()
  @IsString()
  cv: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  linkedin_profile: string;

  @IsNumber()
  @IsNotEmpty()
  years_of_experience: number;

  @IsBoolean()
  @IsNotEmpty()
  student_or_new_graduate: boolean;

  @IsBoolean()
  @IsNotEmpty()
  currently_employed: boolean;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  email: string;
}
