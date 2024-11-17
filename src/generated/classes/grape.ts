import { Wine } from './wine';
import { WineType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class Grape {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ enum: WineType, enumName: 'WineType' })
  type: WineType = WineType.RED;

  @ApiProperty({ isArray: true, type: () => Wine })
  wines: Wine[];
}
