import { Wine } from './wine';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Country {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: String })
  Flag?: string;

  @ApiPropertyOptional({ type: String })
  Region?: string;

  @ApiProperty({ isArray: true, type: () => Wine })
  wines: Wine[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
