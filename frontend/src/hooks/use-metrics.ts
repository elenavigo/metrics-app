import { useEffect, useState } from 'react';
import {
  createMetric,
  getMetrics,
  createMetricBulk,
} from '../services/metrics.service';
import { Metric, MetricProperties } from '../interfaces/metric';
import { MetricType } from '../config/metric-type';

type MetricsByName = Record<MetricType, Metric[]>;

export const useMetrics = () => {
  const [metricsByName, setMetricsByName] = useState<MetricsByName>({
    impression: [],
    submission: [],
    view: [],
    click: [],
  });

  const fetchAll = async () => {
    const response = await getMetrics();

    const organizedMetrics: MetricsByName = response.reduce<MetricsByName>(
      (acc, metric) => {
        const metricName = metric.name as MetricType;
        if (!acc[metricName]) {
          acc[metricName] = [];
        }
        acc[metricName] = [...acc[metricName], metric];
        return acc;
      },
      { impression: [], submission: [], view: [], click: [] },
    );

    setMetricsByName(organizedMetrics);
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
  }, []);

  return { metricsByName, create, createMultiple };
};
