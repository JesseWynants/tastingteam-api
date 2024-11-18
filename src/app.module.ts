import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { WinesModule } from './wines/wines.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScoresModule } from './scores/scores.module';

@Module({
  imports: [PrismaModule, WinesModule, UsersModule, AuthModule, ScoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
