export interface Metric {
  id: string;
  name: string;
  value: number;
  date: Date;
}

export type MetricProperties = Omit<Metric, 'id'>;
