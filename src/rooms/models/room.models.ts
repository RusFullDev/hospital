import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICreateRoomAtrr{
  room_name: string;
  room_number: number;
}


@Table({ tableName: 'rooms' })
export class Room extends Model<Room, ICreateRoomAtrr> {
  @ApiProperty({ example: 1, description: ' unikal ID - raqami' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'therapist',
    description: 'Specialist room(therapist,ophthalmologist,psychiatrist)',
  })
  @Column({ type: DataType.STRING })
  room_name: string;

  @ApiProperty({example: '1',description: 'Room numbers'})
  @Column({ type: DataType.STRING })
  room_number: number;
}
