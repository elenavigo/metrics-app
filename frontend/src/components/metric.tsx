import React, { FC, useMemo } from 'react';
import { LineChart } from './line-chart';
import { MetricForm } from './metric-form';
import { MetricFormProperties } from '../interfaces/metric';
import { ChartData } from '../interfaces/chart-data';
import { useMetrics } from '../hooks/use-metrics';
import { MetricType } from '../config/metric-type';

interface Props {
  metric: MetricType;
  title?: string;
}

export const Metric: FC<Props> = ({ metric, title }) => {
  const { metrics, create } = useMetrics(metric);

  const metricsData: ChartData[] = useMemo(() => {
    return metrics.map((metric) => ({
      x: metric.date.getTime(),
      y: metric.value,
    }));
  }, [metrics]);

  const onSubmit = async (properties: MetricFormProperties) => {
    await create({ ...properties, name: metric });
  };

  return (
    <div>
      {metricsData.length > 0 ? (
        <LineChart title={title ? title : metric} chartData={metricsData} />
      ) : (
        <LineChart title={title ? title : metric} chartData={[]} />
      )}
      <MetricForm onSubmit={onSubmit} />
    </div>
  );
};
