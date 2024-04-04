import { IsNotEmpty, IsString } from "class-validator";

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
  name:string
}
