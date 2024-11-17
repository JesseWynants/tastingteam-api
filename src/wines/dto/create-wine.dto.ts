import { Wine as WineDto } from '../../generated/classes/wine'
import { Grape } from '../../generated/classes/grape'
import { User } from '../../generated/classes/user'
import { Tasting } from '../../generated/classes/tasting'
import { Score } from '../../generated/classes/score'
import { Country } from '../../generated/classes/country'
import { ApiProperty } from '@nestjs/swagger'

export class CreateWineDto {
    @ApiProperty()
    name: string;
    @ApiProperty({ required: false })
    vintage?: number;
    @ApiProperty({ required: false })
    user_description?: string;
    @ApiProperty({ required: false })
    wine_type?: WineType;
    @ApiProperty({ required: false })
    price?: number;
    @ApiProperty({ required: false })
    where_to_buy?: string;
    @ApiProperty({ type: [Grape], required: false })
    grapes?: Grape[];
    @ApiProperty({ type: Country, required: false })
    country?: Country;
}

export enum WineType {
  RED = 'RED',
  WHITE = 'WHITE',
  ROSE = 'ROSE',
  SPARKLING = 'SPARKLING'
}