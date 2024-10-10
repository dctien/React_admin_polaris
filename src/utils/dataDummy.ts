export const generateFakeData = (days: number, chart: string) => {
  const dataArray = [];

  for (let i = 1; i <= days; i++) {
    dataArray.push({
      label: `Day ${i}`,
      data: Math.floor(Math.random() * (chart === 'line' ? 101 : 5000)),
    });
  }

  return dataArray;
};
