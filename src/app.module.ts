import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WinesModule } from './wines/wines.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaModule, WinesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
