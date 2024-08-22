import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const CreditScoreScatterChart = ({
  data = [
    {
      openAccounts5Years: 2,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 1,
      cardInstitutes3Years: 1,
      creditScore: 1,
    },
    {
      openAccounts5Years: 3,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 2,
      cardInstitutes3Years: 2,
      creditScore: 2,
    },
    {
      openAccounts5Years: 4,
      cardInstitutes1Year: 2,
      cardInstitutes2Years: 2,
      cardInstitutes3Years: 3,
      creditScore: 3,
    },
    {
      openAccounts5Years: 5,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 3,
      cardInstitutes3Years: 4,
      creditScore: 3,
    },
    {
      openAccounts5Years: 6,
      cardInstitutes1Year: 2,
      cardInstitutes2Years: 3,
      cardInstitutes3Years: 4,
      creditScore: 4,
    },
    {
      openAccounts5Years: 7,
      cardInstitutes1Year: 2,
      cardInstitutes2Years: 4,
      cardInstitutes3Years: 5,
      creditScore: 5,
    },
    {
      openAccounts5Years: 8,
      cardInstitutes1Year: 3,
      cardInstitutes2Years: 4,
      cardInstitutes3Years: 6,
      creditScore: 6,
    },
    {
      openAccounts5Years: 9,
      cardInstitutes1Year: 3,
      cardInstitutes2Years: 5,
      cardInstitutes3Years: 7,
      creditScore: 7,
    },
    {
      openAccounts5Years: 10,
      cardInstitutes1Year: 4,
      cardInstitutes2Years: 6,
      cardInstitutes3Years: 8,
      creditScore: 8,
    },
    {
      openAccounts5Years: 12,
      cardInstitutes1Year: 4,
      cardInstitutes2Years: 7,
      cardInstitutes3Years: 9,
      creditScore: 9,
    },
    {
      openAccounts5Years: 15,
      cardInstitutes1Year: 5,
      cardInstitutes2Years: 8,
      cardInstitutes3Years: 10,
      creditScore: 10,
    },
    {
      openAccounts5Years: 1,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 1,
      cardInstitutes3Years: 1,
      creditScore: 1,
    },
    {
      openAccounts5Years: 3,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 1,
      cardInstitutes3Years: 2,
      creditScore: 2,
    },
    {
      openAccounts5Years: 4,
      cardInstitutes1Year: 1,
      cardInstitutes2Years: 2,
      cardInstitutes3Years: 3,
      creditScore: 3,
    },
    {
      openAccounts5Years: 5,
      cardInstitutes1Year: 2,
      cardInstitutes2Years: 3,
      cardInstitutes3Years: 3,
      creditScore: 4,
    },
    {
      openAccounts5Years: 6,
      cardInstitutes1Year: 2,
      cardInstitutes2Years: 3,
      cardInstitutes3Years: 4,
      creditScore: 5,
    },
    {
      openAccounts5Years: 7,
      cardInstitutes1Year: 3,
      cardInstitutes2Years: 4,
      cardInstitutes3Years: 5,
      creditScore: 6,
    },
    {
      openAccounts5Years: 8,
      cardInstitutes1Year: 3,
      cardInstitutes2Years: 5,
      cardInstitutes3Years: 6,
      creditScore: 7,
    },
    {
      openAccounts5Years: 9,
      cardInstitutes1Year: 4,
      cardInstitutes2Years: 6,
      cardInstitutes3Years: 7,
      creditScore: 8,
    },
    {
      openAccounts5Years: 11,
      cardInstitutes1Year: 4,
      cardInstitutes2Years: 7,
      cardInstitutes3Years: 8,
      creditScore: 9,
    },
  ],
}) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  const chartData = {
    datasets: [
      {
        label: "최근5년내 미해지 신용개설 총 건수",
        data: data.map((item) => ({
          x: item.openAccounts5Years,
          y: item.creditScore,
        })),
        backgroundColor: darkMode
          ? "rgba(255, 99, 132, 0.9)"
          : "rgba(255, 99, 132, 0.6)",
      },
      {
        label: "최근1년내 신용카드 개설 기관수",
        data: data.map((item) => ({
          x: item.cardInstitutes1Year,
          y: item.creditScore,
        })),
        backgroundColor: darkMode
          ? "rgba(54, 162, 235, 0.9)"
          : "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "최근2년내 신용카드 개설 기관수",
        data: data.map((item) => ({
          x: item.cardInstitutes2Years,
          y: item.creditScore,
        })),
        backgroundColor: darkMode
          ? "rgba(75, 192, 192, 0.9)"
          : "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "최근3년내 신용카드 개설 기관수",
        data: data.map((item) => ({
          x: item.cardInstitutes3Years,
          y: item.creditScore,
        })),
        backgroundColor: darkMode
          ? "rgba(255, 206, 86, 0.9)"
          : "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "건수 / 기관수",
          color: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 텍스트 색상 조정
        },
        grid: {
          color: darkMode ? "#444444" : "#e0e0e0", // 다크모드에 따른 그리드 색상 조정
        },
        ticks: {
          color: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 틱 색상 조정
        },
      },
      y: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "신용등급",
          color: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 텍스트 색상 조정
        },
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
          color: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 틱 색상 조정
        },
        grid: {
          color: darkMode ? "#444444" : "#e0e0e0", // 다크모드에 따른 그리드 색상 조정
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 레전드 텍스트 색상 조정
        },
      },
      tooltip: {
        backgroundColor: darkMode ? "#333333" : "#ffffff", // 다크모드에 따른 툴팁 배경색 조정
        titleColor: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 툴팁 제목 색상 조정
        bodyColor: darkMode ? "#ffffff" : "#000000", // 다크모드에 따른 툴팁 본문 색상 조정
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            const xValue = context.parsed.x;
            const yValue = context.parsed.y;
            return `${label}: (${xValue}, ${yValue}등급)`;
          },
        },
      },
    },
  };

  return <Scatter data={chartData} options={options} />;
};

export default CreditScoreScatterChart;
