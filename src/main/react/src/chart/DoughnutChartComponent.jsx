import React from "react";
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

const ChartDiv = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DoughnutChartComponent = ({ creditGrade = 3 }) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  // 1등급이 가장 높고 10등급이 가장 낮은 체계
  const maxValue = 10;
  const actualValue = maxValue - creditGrade + 1; // 역전된 값 계산

  const chartData = {
    labels: ["Filled", "Remaining"],
    datasets: [
      {
        label: "신용등급",
        data: [actualValue, maxValue - actualValue],
        borderColor: "transparent",
        backgroundColor: ["#253bc9", "transparent"],
        borderWidth: 1,
        borderRadius: 20,
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
            return tooltipItem.label === "Filled"
              ? `신용등급: ${creditGrade}등급`
              : null;
          },
        },
      },
    },
    cutout: "95%",
    rotation: 0, // 시작 위치를 왼쪽으로 설정
    circumference: 360,
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
      const scoreText = `${creditGrade}등급`;

      const titleTextX = width / 2;
      const titleTextY = height / 2 - fontSize * 10;
      const scoreTextX = width / 2;
      const scoreTextY = height / 2 + fontSize * 10;

      ctx.fillStyle = darkMode ? "white" : "black";
      ctx.fillText(titleText, titleTextX, titleTextY);
      ctx.fillText(scoreText, scoreTextX, scoreTextY);

      ctx.save();
    },
  };

  return (
    <Container>
      <ChartDiv>
        <Doughnut
          data={chartData}
          options={options}
          plugins={[centerTextPlugin]}
        />
      </ChartDiv>
    </Container>
  );
};

export default DoughnutChartComponent;
