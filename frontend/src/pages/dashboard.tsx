import React from 'react';
import { LineChart } from '../components/line-chart';
import { useMetrics } from '../hooks/use-metrics';

export const Dashboard: React.FC = () => {
    const { metrics } = useMetrics()

    console.log(metrics)

    return (<div> <h1>Home Page</h1> <LineChart /></div>);
};
