import React from 'react';
import { Metric } from '../components/metric';

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        <Metric metric="impression" title="Impressions" />
        <Metric metric="submission" title="Form submissions" />
      </div>
    </div>
  );
};
