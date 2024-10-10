import React from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartPropsSchema } from '../utils/type';

const BarChart: React.FC<ChartPropsSchema> = ({ labels, data }) => {
  const dataBarChart = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: data,
        fill: true,
        backgroundColor: 'rgba(243, 141, 141, 0.5)',
        borderColor: 'rgba(243, 141, 141, 1)',
        tension: 0.1,
      },
    ],
  };
  return <Bar data={dataBarChart} />;
};

export default BarChart;
