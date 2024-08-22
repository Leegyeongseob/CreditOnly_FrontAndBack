import React from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
`;

const ChartDiv = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 샘플 데이터
const sampleAgeGroups = [
  { label: "10대", grade: 4 },
  { label: "20대", grade: 2 },
  { label: "30대", grade: 3 },
  { label: "40대", grade: 4 },
  { label: "50대", grade: 3 },
  { label: "60대", grade: 3 },
  { label: "70대", grade: 2 },
  { label: "80대", grade: 4 },
  { label: "90대", grade: 3 },
];

const CreditGradeBarChart = ({
  ageGroups = sampleAgeGroups,
  userAgeGroup = "30대",
}) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  const labels = ageGroups.map((group) => group.label);
  const grades = ageGroups.map((group) => group.grade);

  const barColors = labels.map((label) =>
    label === userAgeGroup
      ? darkMode
        ? "rgba(0, 123, 255, 0.8)"
        : "rgba(0, 123, 255, 0.8)"
      : darkMode
      ? "#8290ee"
      : "#263ed8"
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "신용등급",
        data: grades,
        backgroundColor: barColors,
        borderColor: barColors.map(() => "transparent"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const group = ageGroups[index];
            return `연령대: ${group.label}\n신용등급: ${group.grade}점`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <Container darkMode={darkMode}>
      <ChartDiv>
        <Bar data={chartData} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default CreditGradeBarChart;
