import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WineLabel {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
