import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const JobDefaultLoanPieChart = ({
  data = [
    { job: "급여소득자", count: 42 },
    { job: "개인사업자", count: 35 },
    { job: "연금소득자", count: 12 },
    { job: "주부", count: 18 },
    { job: "전문직", count: 23 },
    { job: "프리랜서", count: 29 },
    { job: "무직", count: 47 },
    { job: "기타", count: 15 },
  ],
}) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  const jobLabels = data.map((item) => item.job);

  const backgroundColor = [
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(199, 199, 199, 0.8)",
    "rgba(83, 102, 255, 0.8)",
  ];

  const chartData = {
    labels: jobLabels,
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: backgroundColor,
        borderColor: backgroundColor.map((color) => color.replace("0.8", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: darkMode ? "#fff" : "#333",
        },
      },
      title: {
        display: true,
        text: "직업별 미상환 대출 비율",
        font: {
          size: 16,
        },
        boxWidth: 40, // 색상 박스의 너비
        boxHeight: 20, // 색상 박스의 높이
        color: darkMode ? "#fff" : "#333",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce(
              (acc, data) => acc + data,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${percentage}% (${value})`;
          },
        },
        backgroundColor: darkMode
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        titleColor: darkMode ? "#fff" : "#333",
        bodyColor: darkMode ? "#fff" : "#333",
      },
    },
  };

  return (
    <Container>
      <ChartDiv>
        <Pie data={chartData} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default JobDefaultLoanPieChart;
