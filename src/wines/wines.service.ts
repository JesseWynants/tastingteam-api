import { Injectable } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WinesService {
  constructor(private prisma: PrismaService) {}

  create(createWineDto: CreateWineDto) {
    return this.prisma.wine.create({
      data: {
        ...createWineDto,
        country: createWineDto.country ? {
          connect: { id: createWineDto.country.id }
        } : undefined,
        grapes: {
          connect: createWineDto.grapes.map(grape => ({ id: grape.id }))
        }
      }
    });
  }

  findAll() {
    return this.prisma.wine.findMany({ where: { publishedAt: { not: null } } });
  }
  findDrafts() {
    return this.prisma.wine.findMany({ where: { publishedAt: null } });
  }

  findOne(id: number) {
    return this.prisma.wine.findUnique({ where: { id } });
  }

  update(id: number, updateWineDto: UpdateWineDto) {
    return this.prisma.wine.update({
      where: { id },
      data: {
        ...updateWineDto,
        country: updateWineDto.country ? {
          connect: { id: updateWineDto.country.id }
        } : undefined,
        grapes: {
          set: updateWineDto.grapes.map(grape => ({ id: grape.id }))
        }
      }
    });
  }

  remove(id: number) {
    return this.prisma.wine.delete({ where: { id } });
  }
}
