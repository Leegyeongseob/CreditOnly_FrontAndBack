import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import DataVisualization from "../axiosapi/DataVisualization";
import Loading from "../pages/evaluation/Loading";
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
const ErrorText = styled.div`
  width: 100;
  height: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  font-weight: 500;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;
const ResidentStackedBarChart = () => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";
  //파이썬에서 데이터 가져오는 비동기 함수
  const [creditGrades, setCreditGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const labels = useMemo(
    () => [
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
    ],
    []
  );

  const colors = useMemo(
    () => [
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
    ],
    []
  );

  const processData = useCallback(
    (data) => {
      const gradeSum = new Array(labels.length).fill(0);
      const gradeCount = new Array(labels.length).fill(0);

      data.forEach((item) => {
        const resAdd = item.RES_ADD;
        const cb = parseFloat(item.CB);

        if (!isNaN(cb)) {
          const index = labels.findIndex((label) => resAdd.includes(label));
          if (index !== -1) {
            gradeSum[index] += cb;
            gradeCount[index]++;
          }
        }
      });

      const averageGrades = gradeSum.map((sum, index) =>
        gradeCount[index] > 0 ? (sum / gradeCount[index]).toFixed(1) : 0
      );

      return averageGrades;
    },
    [labels]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await DataVisualization.getResidentStackedBarChart();
        const processedData = processData(response.data);
        setCreditGrades(processedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("데이터를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [processData]);

  // 스택형 막대 그래프의 데이터셋 생성

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "신용등급",
        data: creditGrades,
        backgroundColor: colors.map((color) => `${color}99`),
        borderColor: colors,
        borderWidth: 1,
      },
    ],
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
            if (typeof value === "number" && !isNaN(value)) {
              return `신용등급: ${value.toFixed(1)}`;
            } else {
              return `신용등급: ${value}`;
            }
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
          text: "신용등급평균",
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

  if (isLoading) return <Loading />;
  if (error) return <ErrorText>{error}</ErrorText>;
  return (
    <Container>
      <ChartDiv>
        <Bar data={chartData} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default ResidentStackedBarChart;
