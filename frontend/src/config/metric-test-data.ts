import { MetricProperties } from '../interfaces/metric';

export const metricsData: MetricProperties[] = [
  ...Array.from({ length: 31 }, (_, i) => ({
    name: 'impression',
    value: Math.floor(Math.random() * (1000 - 800) + 800),
    date: new Date(2024, 9, i + 1),
  })),

  ...Array.from({ length: 31 }, (_, i) => ({
    name: 'submission',
    value: Math.floor(Math.random() * (50 - 20) + 20),
    date: new Date(2024, 9, i + 1),
  })),

  ...Array.from({ length: 31 }, (_, i) => ({
    name: 'view',
    value: Math.floor(Math.random() * (5000 - 3000) + 3000),
    date: new Date(2024, 9, i + 1),
  })),
];
