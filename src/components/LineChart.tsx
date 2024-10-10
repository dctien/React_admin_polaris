import React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartPropsSchema } from '../utils/type';

const LineChart: React.FC<ChartPropsSchema> = ({ labels, data }) => {
  const dataLineChart = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset',
        data: data,
        fill: true,
        backgroundColor: 'rgba(243, 141, 141, 0.2)',
        borderColor: 'rgba(243, 141, 141, 1)',
        tension: 0.1,
      },
    ],
  };

  return <Line data={dataLineChart} />;
};

export default LineChart;
