import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
export class UpdatePatientDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  first_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  last_name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  birth_data?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  gender?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;

  @IsOptional()
  @IsPhoneNumber('UZ')
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  foto?: string;

  @IsOptional()
  @IsNumber()
  insurance_number?: string;
}
