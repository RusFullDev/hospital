import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Service } from 'src/services/models/service.models';

interface ICreatePaymentAttr {
  name: string;
}

@Table({ tableName: 'payment' })
export class Payment extends Model<Payment, ICreatePaymentAttr> {
  @ApiProperty({ example: 1, description: ' unikal ID - raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'card', description: 'card or cash' })
  @Column({ type: DataType.STRING })
  name: string;

  @HasMany(() => Service)
  service: Service[];
}
