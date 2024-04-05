import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @IsNotEmpty()
  firs_name: string;
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @IsString()
  @IsNotEmpty()
  specialization: string;
  @IsNumber()
  departmentId: number;
  @IsPhoneNumber('UZ')
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  address: string;
  @IsString()
  foto: string;
  @IsNumber()
  roomsId: number;
  @IsString()
  @IsNotEmpty()
  start_working_time: string;
  @IsString()
  @IsNotEmpty()
  finished_working_time: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsString()
  @IsNotEmpty()
  confirm_password: string;
}
