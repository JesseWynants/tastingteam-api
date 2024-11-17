import { Wine } from './wine';
import { Team } from './team';
import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Tasting {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: Number })
  edition?: number;

  @ApiPropertyOptional({ type: String })
  location?: string;

  @ApiPropertyOptional({ type: String })
  theme?: string;

  @ApiProperty({ isArray: true, type: () => Wine })
  wines: Wine[];

  @ApiProperty({ type: Number })
  teamId: number;

  @ApiProperty({ type: () => Team })
  team: Team;

  @ApiProperty({ isArray: true, type: () => User })
  participants: User[];

  @ApiPropertyOptional({ type: Date })
  time?: Date;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
