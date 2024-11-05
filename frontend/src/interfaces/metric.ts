export interface Metric {
  id: string;
  name: string;
  value: number;
  date: Date;
}
export type MetricFormProperties = Omit<Metric, 'id' | 'name'>;
export type MetricProperties = Omit<Metric, 'id'>;
