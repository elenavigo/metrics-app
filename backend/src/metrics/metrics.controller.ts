import { Controller, Get, Post, Body } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { Metric } from './entities/metric.entity';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  getMetrics(): Promise<Metric[]> {
    return this.metricsService.getAllMetrics();
  }

  @Post()
  createMetric(@Body() metric: Partial<Metric>): Promise<Metric> {
    return this.metricsService.createMetric(metric);
  }
}
