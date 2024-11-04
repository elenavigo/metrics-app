import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const LineChart = () => {
  const [dateRange, setDateRange] = useState<[Date, Date]>([
    new Date('2021-01-01'),
    new Date('2021-05-01'),
  ]);

  const data = [
    { x: new Date('2021-01-01').getTime(), y: 30 },
    { x: new Date('2021-02-01').getTime(), y: 40 },
    { x: new Date('2021-03-01').getTime(), y: 35 },
    { x: new Date('2021-04-01').getTime(), y: 50 },
    { x: new Date('2021-05-01').getTime(), y: 49 },
  ];

  const filteredData = data.filter(
    (d) => d.x >= dateRange[0].getTime() && d.x <= dateRange[1].getTime(),
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
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Sales Line Chart</h2>
      <input
        type="date"
        onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
        className="mb-2 p-2 border rounded"
      />
      <input
        type="date"
        onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
        className="mb-4 p-2 border rounded"
      />
      <Chart options={chartOptions} series={series} type="line" height={350} />
    </div>
  );
};
