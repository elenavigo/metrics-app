import { Metric } from '../interfaces/metric';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getMetrics = async (): Promise<Metric[]> => {
  const response = await axios.get<Metric[]>(`${backendUrl}/metrics`);
  return response.data;
};

export const createMetric = async (metric: Omit<Metric, 'id'>): Promise<void> => {
  await axios.post(`${backendUrl}/metrics`, metric);
};
