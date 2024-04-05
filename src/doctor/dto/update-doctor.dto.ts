
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';


export class UpdateDoctorDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  firs_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  specialization?: string;

  @IsOptional()
  @IsNumber()
  departmentId?: number;

  @IsOptional()
  @IsPhoneNumber('UZ')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsNumber()
  roomsId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  start_working_time?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  finished_working_time?: string;
}
