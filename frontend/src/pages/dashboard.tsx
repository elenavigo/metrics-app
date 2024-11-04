import React from 'react';
import { LineChart } from '../components/line-chart';
import { useMetrics } from '../hooks/use-metrics';
import { MetricForm } from '../components/metric-form';
import { MetricProperties } from '../interfaces/metric';

export const Dashboard: React.FC = () => {
  const { metrics } = useMetrics();

  console.log(metrics);

  const onSubmit = (properties: MetricProperties) => {
    console.log(properties);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <LineChart />
      <MetricForm onSubmit={onSubmit} />
    </div>
  );
};
