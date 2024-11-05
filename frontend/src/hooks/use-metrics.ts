import { useEffect, useState } from 'react';
import { createMetric, getMetrics } from '../services/metrics.service';
import { Metric } from '../interfaces/metric';

export const useMetrics = (id?: string) => {
  const [metrics, setMetrics] = useState<Metric[]>([]);

  const fetchAll = async () => {
    const response = await getMetrics();
    setMetrics(response);
  };

  const create = async (body: Omit<Metric, 'id'>) => {
    await createMetric(body);
    fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, [id]);

  return { metrics, create };
};
