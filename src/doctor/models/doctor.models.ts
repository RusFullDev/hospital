import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointment.models';
import { Department } from 'src/departments/models/department.models';
import { MedicalRecord } from 'src/medical-records/models/medical-record.models';
import { Room } from 'src/rooms/models/room.models';

interface ICreateDoctorAttr {
  firs_name: string;
  last_name: string;
  specialization: string;
  departmentId: number;
  phone: string;
  email: string;
  address: string;
  foto: string;
  roomsId: number;
  start_working_time: string;
  finished_working_time: string;
  hashed_password: string;
}

@Table({ tableName: 'doctor' })
export class Doctor extends Model<Doctor, ICreateDoctorAttr> {
  @ApiProperty({ example: 1, description: 'Foydalanuvchi ID unikal raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  firs_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  specialization: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  departmentId: number;
  @BelongsTo(() => Department)
  department: Department;

  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

  @Column({
    type: DataType.STRING,
  })
  foto: string;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.INTEGER,
  })
  roomsId: number;
  @BelongsTo(() => Room)
  room: Room;

  @Column({
    type: DataType.STRING,
  })
  start_working_time: string;

  @Column({
    type: DataType.STRING,
  })
  finished_working_time: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @HasMany(() => Appointment)
  appointment: Appointment[]

  // @HasMany(() => MedicalRecord)
  // medicalRecord: MedicalRecord[];

}
