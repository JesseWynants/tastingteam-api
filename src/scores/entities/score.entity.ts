import { Score } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from 'src/users/entities/user.entity';

export class ScoreEntity implements Score {
    @ApiProperty()
    score: number;
    @ApiProperty()
    userId: string;
    @ApiProperty({ required: false, type: UserEntity })
    user?: UserEntity;
    @ApiProperty()
    wineId: number;
    @ApiProperty()
    note: string;
    @ApiProperty()
    kelder: boolean;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;
    constructor(partial: Partial<ScoreEntity>) {
        Object.assign(this, partial);
        if (partial.user) {
            this.user = new UserEntity(partial.user);
        }
    }
}
