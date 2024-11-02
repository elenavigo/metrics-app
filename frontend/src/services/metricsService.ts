import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getMetrics = async () => {
  const response = await axios.get(`${backendUrl}/metrics`);
  return response.data;
};

export const createMetric = async (metric: any) => {
  const response = await axios.post(`${backendUrl}/metrics`, metric);
  return response.data;
};
