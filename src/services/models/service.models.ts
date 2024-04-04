import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointment.models';
import { Payment } from 'src/payment/models/payment.models';

interface ICreateServiceAttr {
  service_name: string;
  description: string;
  price: number;
  paymentId: number;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, ICreateServiceAttr> {
  @ApiProperty({ example: 1, description: ' unikal ID - raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'tish olish', description: 'Service name' })
  @Column({
    type: DataType.STRING,
  })
  service_name: string;

  @ApiProperty({
    example: 'ogir xolatdagi tishni olish',
    description: 'Service description',
  })
  @Column({
    type: DataType.STRING,
  })
  description: string;

  @ApiProperty({ example: 1000.5, description: 'price' })
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @ApiProperty({ example: 1, description: 'unikal ID - raqami' })
  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
  })
  paymentId: number;
  @BelongsTo(() => Payment)
  payment: Payment;

  @HasMany(() => Appointment)
  appointment: Appointment;
}
