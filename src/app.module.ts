import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WinesModule } from './wines/wines.module';

@Module({
  imports: [PrismaModule, WinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
