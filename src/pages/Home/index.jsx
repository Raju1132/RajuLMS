import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';

export default function BarLabel() {
  // Define the dataset for the LineChart
  const dataset = [
    { x: 'A', y: 4 },
    { x: 'B', y: 6 },
    { x: 'C', y: 5 },
    { x: 'D', y: 7 },
    { x: 'E', y: 3 },
  ];

  return (
    <>
      {/* BarChart with basic labels */}
      <BarChart
        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        width={500}
        height={300}
        barLabel="value"  // This will display the value of each bar
      />

      {/* Stacked BarChart with custom labels */}
      <BarChart
        series={[
          { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
          { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
          { data: [14, 6, 5, 8, 9], label: 'Series B1' },
        ]}
        barLabel={(item, context) => {
          // Custom label logic based on value and bar height
          if ((item.value ?? 0) > 10) {
            return 'High';
          }
          // Avoid showing labels for very small bars (height < 60)
          return context.bar.height < 60 ? null : item.value?.toString();
        }}
        width={600}
        height={350}
      />

      {/* LineChart */}
      <LineChart
        dataset={dataset}  
        xAxis={[{ dataKey: 'x' }]}  // X-axis uses 'x' key
        series={[{ dataKey: 'y' }]}  // Series uses 'y' key
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}  // Enable grid lines
      />
    </>
  );
}
