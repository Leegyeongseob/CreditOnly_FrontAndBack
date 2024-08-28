import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import DataVisualization from "../axiosapi/DataVisualization";
import styled from "styled-components";
import Loading from "../pages/evaluation/Loading";
import { defaultScatterDataset } from "../data/defaultScatterData";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  color: #ff6b6b;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

const CreditScoreScatterChart = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = localStorage.getItem("isDarkMode") === "true";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await DataVisualization.getCreditScoreScatterChart();

        // API 응답 데이터를 차트 데이터 형식에 맞게 변환
        const formattedData = response.data.map((item) => ({
          openAccounts5Years: item.C00000052,
          cardInstitutes1Year: item.CA1200001,
          cardInstitutes2Years: item.CA2400001,
          cardInstitutes3Years: item.CA3600001,
          creditScore: item.CB,
        }));

        setData(optimizeData(formattedData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(
          defaultScatterDataset.map((item) => ({
            openAccounts5Years: item.C00000052,
            cardInstitutes1Year: item.CA1200001,
            cardInstitutes2Years: item.CA2400001,
            cardInstitutes3Years: item.CA3600001,
            creditScore: item.CB,
          }))
        );
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const optimizeData = (rawData) => {
    // Method 1: Data Aggregation
    const aggregatedData = aggregateData(rawData);

    // Choose which method to use
    return aggregatedData; // or return sampledData;
  };

  const aggregateData = (rawData) => {
    const aggregated = {};
    rawData.forEach((item) => {
      const key = `${item.openAccounts5Years}-${item.creditScore}`;
      if (!aggregated[key]) {
        aggregated[key] = { ...item, count: 0 };
      }
      aggregated[key].count++;
    });
    return Object.values(aggregated);
  };

  const chartData = {
    datasets: [
      {
        label: "최근5년내 미해지 신용개설 총 건수",
        data: data.map((item) => ({
          x: item.openAccounts5Years,
          y: item.creditScore,
          r: item.count ? Math.log(item.count) * 2 + 2 : 2, // Adjust point size based on count
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
          r: item.count ? Math.log(item.count) * 2 + 2 : 2, // Adjust point size based on count
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
          r: item.count ? Math.log(item.count) * 2 + 2 : 2, // Adjust point size based on count
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
          r: item.count ? Math.log(item.count) * 2 + 2 : 2, // Adjust point size based on count
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
            const count = context.raw.r
              ? Math.round(Math.exp((context.raw.r - 2) / 2))
              : 1;
            return `${label}: (${xValue}건, ${yValue}등급) 데이터 수: ${count}`;
          },
        },
      },
    },
  };

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <ChartContainer>
      <Scatter data={chartData} options={options} />
    </ChartContainer>
  );
};

export default CreditScoreScatterChart;
