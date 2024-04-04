import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  room_name: string;

  @IsNumber()
  @IsNotEmpty()
  room_number: number;
}
