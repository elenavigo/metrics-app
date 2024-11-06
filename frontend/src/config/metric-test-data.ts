import { MetricProperties } from '../interfaces/metric';

export const metricsData: MetricProperties[] = [
  ...Array.from({ length: 31 }, (_, i) => ({
    name: 'impression',
    value: Math.floor(Math.random() * (1000 - 800) + 800),
    date: new Date(
      2024,
      9,
      i + 1,
      Math.floor(Math.random() * 24),
      Math.floor(Math.random() * 60),
    ),
  })),

  ...Array.from({ length: 31 }, (_, i) => {
    return Array.from({ length: 5 }, (_, j) => ({
      name: 'impression',
      value: Math.floor(Math.random() * (1000 - 800) + 800),
      date: new Date(2024, 9, i + 1, j, Math.floor(Math.random() * 60)),
    }));
  }).flat(),

  ...Array.from({ length: 31 }, (_, i) => {
    return Array.from({ length: 5 }, (_, j) => ({
      name: 'submission',
      value: Math.floor(Math.random() * (50 - 20) + 20),
      date: new Date(2024, 9, i + 1, j, Math.floor(Math.random() * 60)),
    }));
  }).flat(),

  ...Array.from({ length: 31 }, (_, i) => {
    return Array.from({ length: 5 }, (_, j) => ({
      name: 'view',
      value: Math.floor(Math.random() * (5000 - 3000) + 3000),
      date: new Date(2024, 9, i + 1, j, Math.floor(Math.random() * 60)),
    }));
  }).flat(),
];
