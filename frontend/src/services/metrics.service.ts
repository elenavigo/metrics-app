import { Metric, MetricProperties } from '../interfaces/metric';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getMetrics = async (): Promise<Metric[]> => {
  const response = await axios.get<Metric[]>(`${backendUrl}/metrics`);
  return response.data.map((metric) => ({
    ...metric,
    date: new Date(metric.date),
  }));
};

export const createMetric = async (metric: MetricProperties): Promise<void> => {
  await axios.post(`${backendUrl}/metrics`, metric);
};

export const createMetricBulk = async (
  metric: MetricProperties[],
): Promise<void> => {
  await axios.post(`${backendUrl}/metrics/bulk`, metric);
};
