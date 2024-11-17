import { User } from './user';
import { Tasting } from './tasting';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Team {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ isArray: true, type: () => User })
  users: User[];

  @ApiProperty({ isArray: true, type: () => Tasting })
  tastings: Tasting[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
