import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateAppointmentDto {
  @IsNumber()
  @IsNotEmpty()
  patientId: number;

  @IsNumber()
  @IsNotEmpty()
  doctorId: number;

  @IsNumber()
  @IsNotEmpty()
  serviceId: number;

  @IsNumber()
  @IsNotEmpty()
  statusId: number;

  @IsDateString()
  @IsNotEmpty()
  appointmentDateTime: Date;
}
