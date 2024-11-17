import { Grape } from './grape';
import { User } from './user';
import { Tasting } from './tasting';
import { Score } from './score';
import { Country } from './country';
import { WineType } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Wine {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  name: string;

  @ApiPropertyOptional({ type: Number })
  number?: number;

  @ApiPropertyOptional({ type: Number })
  vintage?: number;

  @ApiProperty({ isArray: true, type: () => Grape })
  grapes: Grape[];

  @ApiPropertyOptional({ type: String })
  user_description?: string;

  @ApiPropertyOptional({ enum: WineType, enumName: 'WineType' })
  wine_type?: WineType;

  @ApiPropertyOptional({ type: Number })
  price?: number;

  @ApiPropertyOptional({ type: String })
  where_to_buy?: string;

  @ApiPropertyOptional({ type: String })
  label?: string;

  @ApiPropertyOptional({ type: String })
  userId?: string;

  @ApiPropertyOptional({ type: () => User })
  user?: User;

  @ApiProperty({ isArray: true, type: () => Tasting })
  tastings: Tasting[];

  @ApiProperty({ isArray: true, type: () => Score })
  scores: Score[];

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiPropertyOptional({ type: Date })
  publishedAt?: Date;

  @ApiPropertyOptional({ type: Date })
  updatedAt?: Date;

  @ApiPropertyOptional({ type: Number })
  countryId?: number;

  @ApiPropertyOptional({ type: () => Country })
  country?: Country;
}
