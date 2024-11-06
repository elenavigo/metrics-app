import React from 'react';
import { MetricGeneric } from '../components/metric';
import { ClickMetric } from '../components/click-metric';
import { useMetrics } from '../hooks/use-metrics';
import { metricsData } from '../config/metric-test-data';

export const Dashboard: React.FC = () => {
  const { metricsByName, create, createMultiple } = useMetrics();

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
        <MetricGeneric
          metricName="impression"
          title="Impressions"
          metricsByName={metricsByName}
          create={create}
        />
        <MetricGeneric
          metricName="submission"
          title="Form submissions"
          metricsByName={metricsByName}
          create={create}
        />
        <MetricGeneric
          metricName="view"
          title="Page views"
          metricsByName={metricsByName}
          create={create}
        />
        <ClickMetric metrics={metricsByName.click} create={create} />
      </div>
    </div>
  );
};
