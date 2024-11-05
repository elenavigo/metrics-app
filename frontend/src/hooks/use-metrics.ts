import { useEffect, useState } from 'react';
import { createMetric, getMetrics } from '../services/metrics.service';
import { Metric } from '../interfaces/metric';
import { MetricType } from '../config/metric-type';

export const useMetrics = (metricName: MetricType) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const fetchAll = async () => {
    const response = await getMetrics();
    const filteredMetric = response.filter(
      (metric) => metric.name === metricName,
    );
    setMetrics(filteredMetric);
  };

  const create = async (body: Omit<Metric, 'id'>) => {
    await createMetric(body);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, [metricName]);

  return { metrics, create };
};
