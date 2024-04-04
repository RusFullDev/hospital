import { ApiProperty, ApiTags } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
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
  @Column({
    type: DataType.INTEGER,
  })
  patientId: number;

  @ApiProperty({ example: 3, description: ' Doctor unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
  })
  doctorId: number;

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
}
