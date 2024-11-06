import { useMemo } from 'react';
import { ChartData } from '../interfaces/chart-data';

export const useMetricAverages = (chartData: ChartData[]) => {
  const dailyAverage = useMemo(() => {
    if (chartData.length === 0) return 0;

    const totalSum = chartData.reduce((sum, data) => sum + data.y, 0);

    const uniqueDays = new Set(
      chartData.map((data) => new Date(data.x).toDateString()),
    ).size;

    return Math.round(totalSum / uniqueDays);
  }, [chartData]);

  const hourlyAverage = useMemo(() => {
    if (chartData.length === 0) return 0;

    const hourlyTotals: { [hour: number]: number[] } = {};
    chartData.forEach(({ x, y }) => {
      const hourKey = new Date(x).getHours();
      if (!hourlyTotals[hourKey]) hourlyTotals[hourKey] = [];
      hourlyTotals[hourKey].push(y);
    });

    const hourAverages = Object.values(hourlyTotals).map(
      (hourData) =>
        hourData.reduce((sum, value) => sum + value, 0) / hourData.length,
    );

    const hourlyAverage = Math.round(
      hourAverages.reduce((sum, avg) => sum + avg, 0) / hourAverages.length,
    );

    return hourAverages.length > 0 ? hourlyAverage : 0;
  }, [chartData]);

  return { dailyAverage, hourlyAverage };
};
