import { Module } from '@nestjs/common';
import { WinesService } from './wines.service';
import { WinesController } from './wines.controller';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  controllers: [WinesController],
  providers: [WinesService],
  imports: [PrismaModule],
})
export class WinesModule {}
