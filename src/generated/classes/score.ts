import { User } from './user';
import { Wine } from './wine';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Score {
  @ApiProperty({ type: String })
  userId: string;

  @ApiProperty({ type: Number })
  wineId: number;

  @ApiProperty({ type: Number })
  score: number;

  @ApiPropertyOptional({ type: String })
  note?: string;

  @ApiPropertyOptional({ type: Boolean })
  kelder?: boolean;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiPropertyOptional({ type: () => Wine })
  wine?: Wine;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
