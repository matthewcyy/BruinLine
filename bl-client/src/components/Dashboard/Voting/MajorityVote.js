import React, { useEffect, useRef } from 'react';
import Chartjs from 'chart.js';
import axos from 'axios'

const Chart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  const chartConfig = {
    type: 'bar',
    data: {
      labels: ['DeNeve', 'Epicuria', 'B-Plate', 'Feast']
      [2, 3, 4, 5]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true
        }
    }
    }
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;