export interface Metric {
  id: string;
  name: string;
  value: string;
  date: Date;
}

export type MetricProperties = Omit<Metric, 'id'>;
