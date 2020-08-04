import React from "react";
import {Pie} from 'react-chartjs-2';
import 'chart.piecelabel.js';

const PieChart = ({labels, data}) => {

  const mlabels = Object.keys(labels);
  const counts = mlabels.map(it => labels[it]);

  const data1 = {
    labels: mlabels,
    datasets: [{
      label: "Population (millions)",
      backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
      data: counts
    }]
  }
  const options = {
    legend: {
      display: true,
      position: "right",
    },
    pieceLabel: {
      render: 'value',
      fontColor: '#fff',
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return <div>
    <Pie data={data1} options={options}/>
  </div>
};

export default PieChart;