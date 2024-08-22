import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rainbowColors = [
  "#FF0000", // Red (1등급)
  "#FF7F00", // Orange
  "#FFFF00", // Yellow
  "#7FFF00", // Chartreuse
  "#00FF00", // Green
  "#00FF7F", // Spring Green
  "#00FFFF", // Cyan
  "#007FFF", // Azure
  "#0000FF", // Blue (9등급)
  "rgba(0,0,0,0)", // Transparent (10등급)
];

const CreditScoreChart = ({ score = 3 }) => {
  const isDarkMode = localStorage.getItem("isDarkMode") === "true";

  const maxValue = 10;
  const actualValue = 11 - Math.min(Math.max(score, 1), maxValue);

  const generateCumulativeData = (value) => {
    const data = [];
    const colors = [];

    for (let i = 0; i < maxValue; i++) {
      if (i < Math.floor(value)) {
        data.push(1);
        colors.push(rainbowColors[i]);
      } else if (i === Math.floor(value) && value % 1 !== 0) {
        data.push(value % 1);
        colors.push(rainbowColors[i]);
        data.push(1 - (value % 1));
        colors.push("rgba(0,0,0,0)");
      } else {
        data.push(0);
        colors.push("rgba(0,0,0,0)");
      }
    }

    if (value < maxValue) {
      data.push(maxValue - Math.floor(value) - (value % 1 > 0 ? 1 : 0));
      colors.push("rgba(0,0,0,0)");
    }

    return { data, colors };
  };

  const { data: cumulativeData, colors } = generateCumulativeData(actualValue);

  const chartData = {
    labels: [
      ...rainbowColors.map((_, index) => `구간 ${10 - index}`),
      "남은 부분",
    ],
    datasets: [
      {
        label: "신용점수",
        data: cumulativeData,
        backgroundColor: colors,
        borderColor: colors.map(() => "transparent"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === "남은 부분") {
              return `남은 점수: ${(
                actualValue - Math.floor(actualValue)
              ).toFixed(1)}`;
            }
            return `신용점수: ${score.toFixed(1)}/${maxValue}`;
          },
        },
      },
    },
    cutout: "80%",
    rotation: -90,
    circumference: 180,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const centerTextPlugin = {
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, width, height } = chart;
      ctx.restore();
      const fontSize = (height / 200).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const titleText = "신용등급";
      const scoreText = `${score}등급`;

      const titleTextX = width / 2;
      const titleTextY = height / 2 + fontSize * 10;
      const scoreTextX = width / 2;
      const scoreTextY = height / 2 + fontSize * 30;

      ctx.fillStyle = isDarkMode ? "#fff" : "#000";
      ctx.fillText(titleText, titleTextX, titleTextY);
      ctx.fillText(scoreText, scoreTextX, scoreTextY);

      ctx.save();
    },
  };

  return (
    <Container>
      <Doughnut
        data={chartData}
        options={options}
        plugins={[centerTextPlugin]}
      />
    </Container>
  );
};

export default CreditScoreChart;
