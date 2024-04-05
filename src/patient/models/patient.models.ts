import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Appointment } from 'src/appointments/models/appointment.models';
import { MedicalRecord } from 'src/medical-records/models/medical-record.models';

interface ICreatePatientAttr {
  first_name: string;
  last_name: string;
  birth_data: string;
  gender: string;
  address: string;
  phone: string;
  email: string;
  foto: string;
  insurance_number: string;
}

@Table({ tableName: 'patient' })
export class Patient extends Model<Patient, ICreatePatientAttr> {
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
  first_name: string;

  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
  })
  birth_data: string;

  @Column({
    type: DataType.STRING,
  })
  gender: string;

  @Column({
    type: DataType.STRING,
  })
  address: string;

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
  foto: string;

  @Column({
    type: DataType.STRING,
  })
  insurance_number: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;

  @Column({
    type: DataType.STRING,
  })
  activation_link: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;



  @HasMany(()=>Appointment)
  appointment:Appointment[]
  // @HasMany(()=>MedicalRecord)
  // medical_record:MedicalRecord[]
}
