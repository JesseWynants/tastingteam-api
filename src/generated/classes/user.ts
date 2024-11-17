import { Wine } from './wine';
import { Score } from './score';
import { Team } from './team';
import { Tasting } from './tasting';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: String })
  name?: string;

  @ApiPropertyOptional({ type: String })
  email?: string;

  @ApiPropertyOptional({ type: Date })
  emailVerified?: Date;

  @ApiPropertyOptional({ type: String })
  image?: string;

  @ApiProperty({ isArray: true, type: () => Wine })
  wines: Wine[];

  @ApiProperty({ isArray: true, type: () => Score })
  scores: Score[];

  @ApiProperty({ isArray: true, type: () => Team })
  teams: Team[];

  @ApiProperty({ isArray: true, type: () => Tasting })
  tastings: Tasting[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;
}
