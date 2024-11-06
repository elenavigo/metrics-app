import { useMemo } from 'react';
import { ChartData } from '../interfaces/chart-data';

export const useMetricsDailyAverage = (chartData: ChartData[]) => {
  const dailyAverage = useMemo(() => {
    if (chartData.length === 0) return 0;

    const totalSum = chartData.reduce((sum, data) => sum + data.y, 0);

    const uniqueDays = new Set(
      chartData.map((data) => new Date(data.x).toDateString()),
    ).size;

    return Math.round(totalSum / uniqueDays);
  }, [chartData]);

  return { dailyAverage };
};
