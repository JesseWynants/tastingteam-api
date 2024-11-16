import { Injectable } from '@nestjs/common';
import { CreateWineDto } from './dto/create-wine.dto';
import { UpdateWineDto } from './dto/update-wine.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WinesService {
  constructor(private prisma: PrismaService) {}

  create(createWineDto: CreateWineDto) {
    return 'This action adds a new wine';
  }

  findAll() {
    return this.prisma.wine.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} wine`;
  }

  update(id: number, updateWineDto: UpdateWineDto) {
    return `This action updates a #${id} wine`;
  }

  remove(id: number) {
    return `This action removes a #${id} wine`;
  }
}
