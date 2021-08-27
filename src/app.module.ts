import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
