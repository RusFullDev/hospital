import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICreateMedicalAttr {
  patientId: number;
  doctorId: number;
  date_visit: Date;
  diagnosis: string;
  treatment_plan: string;
}

@Table({ tableName: 'medical_record' })
export class MedicalRecord extends Model<MedicalRecord,ICreateMedicalAttr> {
  @ApiProperty({ example: 1, description: ' unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'Patient unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
  })
  patientId: number;

  @ApiProperty({ example: 1, description: 'Doctors unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
  })
  doctorId: number;

  @ApiProperty({
    example: '2023-01-01',
    description: 'Visited date of hospital',
  })
  @Column({
    type: DataType.DATE,
  })
  date_visit: Date;


  @ApiProperty({
    example: 'covid-19',
    description: 'treatment diagnosis',
  })
  @Column({
    type: DataType.STRING,
  })
  diagnosis: string;

  @ApiProperty({
    example: 'to be regularly monitored',
    description: 'method of treatment',
  })
  @Column({
    type: DataType.STRING,
  })
  treatment_plan: string;
}
