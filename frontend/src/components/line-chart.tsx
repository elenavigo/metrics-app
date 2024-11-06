import React, { FC, useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartData } from '../interfaces/chart-data';
import { useMetricsDailyAverage } from '../hooks/use-daily-average';

interface Props {
  title: string;
  chartData: ChartData[];
}

export const LineChart: FC<Props> = ({ title, chartData }) => {
  const { dailyAverage } = useMetricsDailyAverage(chartData);

  const [dateRange, setDateRange] = useState<[number, number]>([
    Math.min(...chartData.map((d) => d.x)),
    Math.max(...chartData.map((d) => d.x)),
  ]);

  useEffect(() => {
    setDateRange([
      Math.min(...chartData.map((d) => d.x)),
      Math.max(...chartData.map((d) => d.x)),
    ]);
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
        formatter: function (value: string) {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
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
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Chart options={chartOptions} series={series} type="line" height={350} />
      <div>
        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          Average daily: <span>{dailyAverage}</span>
        </span>
      </div>
    </div>
  );
};
