import React, { useMemo } from 'react';
import { LineChart } from '../components/line-chart';
import { useMetrics } from '../hooks/use-metrics';
import { MetricForm } from '../components/metric-form';
import { MetricProperties } from '../interfaces/metric';
import { ChartData } from '../interfaces/chart-data';

export const Dashboard: React.FC = () => {
  const { metrics, create } = useMetrics();

  const metricsData: ChartData[] = useMemo(() => {
    return metrics.map((metric) => ({
      x: metric.date.getTime(),
      y: metric.value,
    }));
  }, [metrics]);

  const onSubmit = async (properties: MetricProperties) => {
    await create(properties);
  };

  return (
    <div>
      <h1>Home Page</h1>
      {metricsData.length > 0 && (
        <LineChart title="Impressions" chartData={metricsData} />
      )}
      <MetricForm onSubmit={onSubmit} />
    </div>
  );
};
