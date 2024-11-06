import { FC, useMemo, useState } from 'react';
import { LineChart } from './line-chart';
import { ChartData } from '../interfaces/chart-data';
import { Metric, MetricProperties } from '../interfaces/metric';

interface Props {
  metrics: Metric[];
  create: (properties: MetricProperties) => void;
}

export const ClickMetric: FC<Props> = ({ metrics, create }) => {
  const [value, setValue] = useState(1);
  const [lastDate, setLastDate] = useState(new Date());

  const metricsData: ChartData[] = useMemo(() => {
    return metrics.map((metric) => ({
      x: metric.date.getTime(),
      y: metric.value,
    }));
  }, [metrics]);

  const handleClick = async () => {
    const newDate = new Date(lastDate);
    newDate.setDate(lastDate.getDate() + 1);
    await create({ date: newDate, value: value, name: 'click' });
    setValue((prevValue) => prevValue + 1);
    setLastDate(newDate);
  };

  return (
    <div className="m-4 p-4 bg-white rounded-lg shadow-md">
      {metricsData.length > 0 ? (
        <LineChart title="Button clicks" chartData={metricsData} />
      ) : (
        <LineChart title="Button clicks" chartData={[]} />
      )}
      <div>
        <button
          onClick={handleClick}
          className="mt-3 ms-2 bg-green-200 hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
        >
          Click!
        </button>
      </div>
    </div>
  );
};
