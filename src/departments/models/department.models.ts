import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICreateDepartmentAttr {
  department_name: string;
  head_doctorId: number;
}

@Table({ tableName: 'department' })
export class Department extends Model<Department, ICreateDepartmentAttr> {
  @ApiProperty({ example: 1, description: ' unique ID - numbers' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'dermatologist',
    description: 'specialist ',
  })
  @Column({
    type: DataType.STRING,
  })
  department_name: string;

  @ApiProperty({
    example: '1',
    description: 'unique ID - numbers',
  })
  @Column({
    type: DataType.STRING,
  })
  head_doctorId: number;
}
