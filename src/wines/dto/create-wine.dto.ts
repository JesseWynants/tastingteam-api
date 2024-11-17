import { Wine as WineDto } from '../../generated/classes/wine'
import { Grape } from '../../generated/classes/grape'
import { User } from '../../generated/classes/user'
import { Tasting } from '../../generated/classes/tasting'
import { Score } from '../../generated/classes/score'
import { Country } from '../../generated/classes/country'
import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsNotEmpty,
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsIn,
    IsEnum,
    IsNumber,
    IsArray,
    ValidateNested,
    Length,
    Min,
    Max
} from 'class-validator';
import { Type } from 'class-transformer';

export enum WineType {
RED = 'RED',
WHITE = 'WHITE',
ROSE = 'ROSE',
SPARKLING = 'SPARKLING'
}

export class CreateWineDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @ApiProperty()
    name: string;

    @IsInt()
    @Min(1000)
    @Max(9999)
    @ApiProperty({ required: false })
    vintage?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    user_description?: string;

    @IsEnum(WineType)
    @ApiProperty({ required: false })
    wine_type?: WineType;

    @IsOptional()
    @IsNumber( ( { maxDecimalPlaces: 2 } ) )
    @ApiProperty({ required: false })
    price?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    where_to_buy?: string;

    @IsOptional()
    @IsArray()
    @ApiProperty({ type: [Grape], required: false })
    grapes?: Grape[];
    
    @IsOptional()
    @IsArray()
    @ApiProperty({ type: Country, required: false })
    country?: Country;
}
