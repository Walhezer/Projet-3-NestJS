import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  rental_id: number;

  @IsString()
  @IsNotEmpty()
  message: string;
}