import { Wine } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Grape } from "src/generated/classes/grape";

export class WineEntity implements Wine {
    @ApiProperty()
    id: number;
    @ApiProperty()
    number: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    label: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    publishedAt: Date;
    @ApiProperty()
    updatedAt: Date;
    @ApiProperty()
    vintage: number;
    @ApiProperty()
    user_description: string;
    @ApiProperty()
    wine_type: WineType;
    @ApiProperty()
    price: number;
    @ApiProperty()
    where_to_buy: string;
    @ApiProperty()
    countryId: number;
    @ApiProperty({ type: [Grape], required: false })
    grapes?: Grape[];
}

export enum WineType {
    RED = 'RED',
    WHITE = 'WHITE',
    ROSE = 'ROSE',
    SPARKLING = 'SPARKLING'
  }