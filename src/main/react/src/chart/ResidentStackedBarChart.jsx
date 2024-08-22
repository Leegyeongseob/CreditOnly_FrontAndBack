import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale
);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChartDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResidentStackedBarChart = ({
  creditGrades = [
    2.2, 3.2, 3.2, 2.1, 4.4, 3.3, 3.1, 2.6, 3.7, 1.9, 2.3, 3.5, 4.3, 3.8, 4.1,
    3.7, 3.3, 2.8, 3.2,
  ],
}) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  const labels = [
    "경기",
    "인천",
    "충남",
    "충북",
    "울산",
    "서울",
    "경남",
    "강원",
    "광주",
    "대구",
    "경북",
    "대전",
    "부산",
    "전북",
    "제주",
    "전남",
    "세종",
    "충청",
    "전라",
  ];

  // 다채로운 색상 배열
  const colors = [
    "#FF6633",
    "#FFB399",
    "#FF33FF",
    "#FFFF99",
    "#00B3E6",
    "#E6B333",
    "#3366E6",
    "#999966",
    "#99FF99",
    "#B34D4D",
    "#80B300",
    "#809900",
    "#E6B3B3",
    "#6680B3",
    "#66991A",
    "#FF99E6",
    "#CCFF1A",
    "#FF1A66",
    "#E6331A",
  ];

  // 스택형 막대 그래프의 데이터셋 생성
  const datasets = [
    {
      label: "신용등급",
      data: creditGrades,
      backgroundColor: colors.map((color) => `${color}99`), // 60% 불투명도
      borderColor: colors,
      borderWidth: 1,
    },
  ];

  // 차트 데이터
  const chartData = {
    labels: labels,
    datasets: datasets,
  };

  // 차트 옵션
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw;
            return `신용등급: ${value.toFixed(1)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "거주지",
          color: darkMode ? "white" : "black",
        },
        ticks: {
          color: darkMode ? "white" : "black",
        },
        grid: {
          color: darkMode ? "darkgray" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        title: {
          display: true,
          text: "신용등급",
          color: darkMode ? "white" : "black",
        },
        ticks: {
          color: darkMode ? "white" : "black",
          stepSize: 1,
          callback: function (value) {
            return value.toFixed(1);
          },
        },
        grid: {
          color: darkMode ? "darkgray" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <Container>
      <ChartDiv>
        <Bar data={chartData} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default ResidentStackedBarChart;
