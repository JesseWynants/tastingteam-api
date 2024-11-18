import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [ScoresController],
  providers: [ScoresService],
  imports: [PrismaModule],
})
export class ScoresModule {}
