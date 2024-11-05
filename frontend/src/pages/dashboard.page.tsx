import React from 'react';
import { Metric } from '../components/metric';
import { ClickMetric } from '../components/click-metric';
import { useMetrics } from '../hooks/use-metrics';
import { metricsData } from '../config/metric-test-data';

export const Dashboard: React.FC = () => {
  const { createMultiple } = useMetrics();

  const handleClick = async () => {
    console.log(metricsData, 'data');
    await createMultiple(metricsData);
  };

  return (
    <div className="container mx-auto">
      <button
        onClick={handleClick}
        className="my-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Add test data to metrics
      </button>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <Metric metric="impression" title="Impressions" />
        <Metric metric="submission" title="Form submissions" />
        <Metric metric="view" title="Page views" />
        <ClickMetric />
      </div>
    </div>
  );
};
