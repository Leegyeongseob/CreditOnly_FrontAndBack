import React from "react";
import { Radar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const Container = styled.div`
  width: 65%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  transform: background-color 0.5s ease;
`;

const ChartDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 샘플 데이터 (1등급이 가장 높음)
const sampleJobGroups = [
  { label: "급여소득자", grade: 2.5 },
  { label: "개인사업자", grade: 3.5 },
  { label: "연금소득자", grade: 2.2 },
  { label: "주부", grade: 3.3 },
  { label: "전문직", grade: 3.1 },
  { label: "프리랜서", grade: 3.8 },
  { label: "무직", grade: 5 },
  { label: "기타", grade: 4.6 },
];

const CreditGradeRadarChart = ({
  jobGroups = sampleJobGroups,
  userJob = "급여소득자",
}) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  const labels = jobGroups.map((group) => group.label);
  const grades = jobGroups.map((group) => 11 - group.grade); // 차트 표시를 위해 등급을 역전시킴

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "신용등급",
        data: grades,
        backgroundColor: darkMode
          ? "rgba(0, 123, 255, 0.2)"
          : "rgba(0, 123, 255, 0.2)",
        borderColor: darkMode
          ? "rgba(0, 123, 255, 0.8)"
          : "rgba(0, 123, 255, 0.8)",
        borderWidth: 2,
        pointBackgroundColor: labels.map((label) =>
          label === userJob ? "#ff6384" : darkMode ? "#8290ee" : "#263ed8"
        ),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const group = jobGroups[index];
            return `직업: ${group.label}\n신용등급: ${group.grade}등급`;
          },
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
        },
        pointLabels: {
          color: darkMode ? "#fff" : "#000",
        },
        ticks: {
          reverse: true,
          min: 1,
          max: 10,
          stepSize: 1,
          color: darkMode ? "#fff" : "#000",
          backdropColor: darkMode ? "#242424" : "#fff", // 이 줄을 추가
          callback: function (value) {
            return 11 - value;
          },
        },
      },
    },
  };

  return (
    <Container darkMode={darkMode}>
      <ChartDiv>
        <Radar data={chartData} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default CreditGradeRadarChart;
