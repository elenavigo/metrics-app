import React, { FC, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartData } from '../interfaces/chart-data';

interface Props {
  title: string;
  chartData: ChartData[];
}

export const LineChart: FC<Props> = ({ title, chartData }) => {
  const [dateRange, setDateRange] = useState<[number, number]>([
    Math.min(...chartData.map((d) => d.x)),
    Math.max(...chartData.map((d) => d.x)),
  ]);

  const filteredData = useMemo(
    () => chartData.filter((d) => d.x >= dateRange[0] && d.x <= dateRange[1]),
    [],
  );

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
      name: 'Sales',
      data: filteredData,
    },
  ];

  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <input
        type="date"
        onChange={(e) =>
          setDateRange([new Date(e.target.value).getTime(), dateRange[1]])
        }
        className="mb-2 p-2 border rounded"
      />
      <input
        type="date"
        onChange={(e) =>
          setDateRange([dateRange[0], new Date(e.target.value).getTime()])
        }
        className="mb-4 p-2 border rounded"
      />
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
};
