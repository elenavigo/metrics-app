import React, { FC, useMemo } from 'react';
import { LineChart } from './line-chart';
import { MetricForm } from './metric-form';
import {
  Metric,
  MetricFormProperties,
  MetricProperties,
} from '../interfaces/metric';
import { ChartData } from '../interfaces/chart-data';
import { MetricType } from '../config/metric-type';

interface Props {
  metricName: MetricType;
  title?: string;
  metricsByName: Record<MetricType, Metric[]>;
  create: (properties: MetricProperties) => void;
}

export const MetricGeneric: FC<Props> = ({
  metricName,
  title,
  metricsByName,
  create,
}) => {
  const metricsData: ChartData[] = useMemo(() => {
    return metricsByName[metricName].map((metric) => ({
      x: metric.date.getTime(),
      y: metric.value,
    }));
  }, [metricsByName, metricName]);

  const onSubmit = async (properties: MetricFormProperties) => {
    await create({ ...properties, name: metricName });
  };

  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md">
      {metricsData.length > 0 ? (
        <LineChart title={title ? title : metricName} chartData={metricsData} />
      ) : (
        <LineChart title={title ? title : metricName} chartData={[]} />
      )}

      <MetricForm onSubmit={onSubmit} />
    </div>
  );
};
