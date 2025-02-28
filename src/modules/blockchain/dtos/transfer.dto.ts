import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransferDto {
  @ApiProperty({
    description: 'Destination account address',
    example: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'Token ID to transfer',
    example: '1'
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string;
}
