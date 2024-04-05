import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDoctorDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
