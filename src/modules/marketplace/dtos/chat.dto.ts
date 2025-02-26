import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  @IsNotEmpty()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  message: string;
}

export class MarkMessageReadDto {
  @IsNumber()
  @IsNotEmpty()
  messageId: number;
} 