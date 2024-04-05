import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Doctor } from 'src/doctor/models/doctor.models';
import { Patient } from 'src/patient/models/patient.models';
import { Payment } from 'src/payment/models/payment.models';
import { Service } from 'src/services/models/service.models';
import { Status } from 'src/status/models/status.models';

interface ICreateAppointmentAttr {
  patientId: number;
  doctorId: number;
  serviceId: number;
  statusId: number;
  appointmentDateTime: Date;
}


@Table({ tableName: 'appointment' })
export class Appointment extends Model<Appointment, ICreateAppointmentAttr> {
  @ApiProperty({ example: 1, description: ' Appointment unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 2, description: ' Patient unique ID - numbers' })
  @ForeignKey(()=>Patient)
  @Column({
    type: DataType.INTEGER,
  })
  patientId: number;
  @BelongsTo(()=>Patient)
  patient:Patient

  @ApiProperty({ example: 3, description: ' Doctor unique ID - numbers' })
  @ForeignKey(()=>Doctor)
  @Column({
    type: DataType.INTEGER,
  })
  doctorId: number;
  @BelongsTo(()=>Doctor)
  doctror:Doctor

  @ApiProperty({ example: 3, description: ' Service unique ID - numbers' })
  @ForeignKey(() => Service)
  @Column({
    type: DataType.INTEGER,
  })
  serviceId: number;
  @BelongsTo(() => Service)
  service: Service;

  @ApiProperty({ example: 3, description: ' Status unique ID - numbers' })
  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
  })
  statusId: number;
  @BelongsTo(() => Status)
  status: Status;

  @ApiProperty({
    example: '2024-01-02',
    description: 'Appointment date and time',
  })
  @Column({
    type: DataType.DATE,
  })
  appointmentDateTime: Date;

  // @BelongsToMany(()=>Service,()=>Payment)
  // services:Service[]
}
