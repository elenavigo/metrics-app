import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from './entities/metric.entity';

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metric)
    private metricsRepository: Repository<Metric>,
  ) {}

  getAllMetrics(): Promise<Metric[]> {
    return this.metricsRepository.find();
  }

  createMetric(metric: Partial<Metric>): Promise<Metric> {
    const newMetric = this.metricsRepository.create(metric);
    return this.metricsRepository.save(newMetric);
  }
}
