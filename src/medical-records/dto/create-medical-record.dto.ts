import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateMedicalRecordDto {
  @IsNumber()
  patientId: number;

  @IsNumber()
  doctorId: number;

  @IsDateString()
  date_visit: Date;

  @IsString()
  diagnosis: string;

  @IsString()
  treatment_plan: string;
}
