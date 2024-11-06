import React, { FC, useMemo } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartData } from '../interfaces/chart-data';
import { useMetricAverages } from '../hooks/use-metric-averages';

interface Props {
  title: string;
  chartData: ChartData[];
}

export const LineChart: FC<Props> = ({ title, chartData }) => {
  const { dailyAverage, hourlyAverage } = useMetricAverages(chartData);

  const dateRange = useMemo(() => {
    const minDate = Math.min(...chartData.map((d) => d.x));
    const maxDate = Math.max(...chartData.map((d) => d.x));
    return [minDate, maxDate];
  }, [chartData]);

  const filteredData = useMemo(() => {
    return chartData.filter((d) => d.x >= dateRange[0] && d.x <= dateRange[1]);
  }, [chartData, dateRange]);

  const chartOptions: ApexOptions = {
    chart: {
      type: 'line',
      zoom: { enabled: false },
    },
    xaxis: {
      type: 'datetime',
      labels: {
        formatter: function (value: any) {
          const timestamp = Number(value);
          const date = new Date(timestamp);
          return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
        },
      },
    },
    tooltip: {
      x: {
        formatter: function (value: any) {
          const timestamp = Number(value);
          const date = new Date(timestamp);
          return `${date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })} ${date.getHours()}:${date.getMinutes()}`;
        },
      },
    },
  };

  const series = [
    {
      name: 'Value',
      data: filteredData,
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="flex mb-2">
        <div>
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Daily average: <span>{dailyAverage}</span>
          </span>
        </div>
        <div className="ms-1">
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Hourly average: <span>{hourlyAverage}</span>
          </span>
        </div>
      </div>
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
};
