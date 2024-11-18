import { ApiProperty } from '@nestjs/swagger'
import {
    IsBoolean,
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    Max
} from 'class-validator';

export class CreateScoreDto {
    @IsNumber({ maxDecimalPlaces: 1 })
    @Min(0)
    @Max(5)
    @ApiProperty()
    score: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    wineId: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    note: string;

    @IsBoolean()
    @ApiProperty()
    kelder: boolean;
}
