import { useEffect, useState } from 'react';
import {
  createMetric,
  getMetrics,
  createMetricBulk,
} from '../services/metrics.service';
import { Metric, MetricProperties } from '../interfaces/metric';
import { MetricType } from '../config/metric-type';

export const useMetrics = (metricName?: MetricType) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const fetchAll = async () => {
    const response = await getMetrics();
    const filteredMetric = response.filter(
      (metric) => metric.name === metricName,
    );
    setMetrics(filteredMetric);
  };

  const create = async (body: MetricProperties) => {
    await createMetric(body);
    fetchAll();
  };

  const createMultiple = async (body: MetricProperties[]) => {
    await createMetricBulk(body);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, [metricName]);

  return { metrics, create, createMultiple };
};
