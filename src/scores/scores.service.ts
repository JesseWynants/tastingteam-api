import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ScoresService {
    constructor(private prisma: PrismaService) {}
    create(createScoreDto: CreateScoreDto) {
        return this.prisma.score.create({data: createScoreDto});
    }

    findAll() {
        return `This action returns all scores`;
    }
    findWineScores(wineId: number) {
        return this.prisma.score.findMany({
            where: { wineId: wineId },
            include: { user: true },
        });
    }
    findOne(id: number) {
        return `This action returns a #${id} score`;
    }

    update(id: number, updateScoreDto: UpdateScoreDto) {
        return `This action updates a #${id} score`;
    }

    remove(id: number) {
        return `This action removes a #${id} score`;
    }
    }
