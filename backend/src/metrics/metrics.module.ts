// metrics.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { Metric } from './entities/metric.entity'; // Import your Metric entity

@Module({
  imports: [TypeOrmModule.forFeature([Metric])], // Ensure Metric is registered
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
