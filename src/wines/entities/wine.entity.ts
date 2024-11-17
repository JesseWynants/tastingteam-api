import { Wine } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Grape } from "src/generated/classes/grape";
import { UserEntity } from "src/users/entities/user.entity";
import { WineType } from '@prisma/client';

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
    @ApiProperty({ required: false, type: UserEntity })
    user?: UserEntity;
    @ApiProperty()
    where_to_buy: string;
    @ApiProperty()
    countryId: number;
    @ApiProperty({ type: [Grape], required: false })
    grapes?: Partial<Grape>[];
    
    constructor(partial: Partial<WineEntity>) {
        Object.assign(this, {
            ...partial,
            grapes: partial.grapes?.map(grape => ({
                ...grape,
                wines: (grape as any).wines || []
            }))
        });
        if (partial.user) {
            this.user = new UserEntity(partial.user);
          }
        }
}