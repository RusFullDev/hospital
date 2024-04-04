import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointment.models';

interface ICreateStatusAttr {
  name: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, ICreateStatusAttr> {
  @ApiProperty({ example: 1, description: ' unikal ID - raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'scheduled',
    description: 'scheduled,confirmed,cancelled,completed,missed',
  })
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Appointment)
  appointment: Appointment[];
}
