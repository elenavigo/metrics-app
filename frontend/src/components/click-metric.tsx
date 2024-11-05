import { FC, useMemo, useState } from 'react';
import { LineChart } from './line-chart';
import { ChartData } from '../interfaces/chart-data';
import { useMetrics } from '../hooks/use-metrics';

export const ClickMetric: FC = () => {
  const { metrics, create } = useMetrics('click');
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
    <div>
      {metricsData.length > 0 ? (
        <LineChart title="Button clicks" chartData={metricsData} />
      ) : (
        <LineChart title="Button clicks" chartData={[]} />
      )}
      <button
        onClick={handleClick}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        Add next day metric
      </button>
    </div>
  );
};
