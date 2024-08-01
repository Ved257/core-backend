import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { jobType, whereInJobSearch } from "src/enums/user.enum";

export class PreferenceDto {
  @IsString()
  @IsNotEmpty()
  @IsEnum(whereInJobSearch)
  where_in_job_search: whereInJobSearch;

  @IsBoolean()
  @IsNotEmpty()
  sponsorship_requirement_to_work_in_us: boolean;

  @IsBoolean()
  @IsNotEmpty()
  legally_to_work_in_us: boolean;

  @IsString()
  @IsNotEmpty()
  @IsEnum(jobType)
  job_type: jobType;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  preferred_locations: string[];

  @IsBoolean()
  @IsOptional()
  open_to_work_remotely: boolean;

  @IsString()
  @IsNotEmpty()
  desired_salary_currency: string;

  @IsNumber()
  @IsNotEmpty()
  desired_salary_amount: number;

  company_size_preferences: {
    seed: { ideal: boolean; yes: boolean; no: boolean };
    early: { ideal: boolean; yes: boolean; no: boolean };
    mid_size: { ideal: boolean; yes: boolean; no: boolean };
    large: { ideal: boolean; yes: boolean; no: boolean };
    very_large: { ideal: boolean; yes: boolean; no: boolean };
    massive: { ideal: boolean; yes: boolean; no: boolean };
  };
}
