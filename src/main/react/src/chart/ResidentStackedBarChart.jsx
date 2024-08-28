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
import { defaultResidentData } from "../data/defaultResidentData";

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

const ResidentStackedBarChart = ({ residence }) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";
  const [creditGrades, setCreditGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

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

  const isResidenceMatch = useCallback(
    (label) => {
      if (!label) return false;
      return label.includes(residence) || residence.includes(label);
    },
    [residence]
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
        gradeCount[index] > 0
          ? parseFloat((sum / gradeCount[index]).toFixed(1))
          : 0
      );

      console.log("Processed Data:", averageGrades);
      return averageGrades;
    },
    [labels]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await DataVisualization.getResidentStackedBarChart();
        console.log("API Response:", response.data);
        const processedData = processData(response.data);
        setCreditGrades(processedData);
        setLoadError(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setCreditGrades(defaultResidentData);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [processData]);

  const chartData = useMemo(() => {
    console.log("Chart Data - Labels:", labels);
    console.log("Chart Data - Credit Grades:", creditGrades);
    return {
      labels: labels,
      datasets: [
        {
          label: "신용등급",
          data: creditGrades,
          backgroundColor: labels.map((label) =>
            isResidenceMatch(label)
              ? darkMode
                ? "rgba(255, 255, 0, 0.8)"
                : "rgba(255, 0, 0, 0.8)"
              : `${colors[labels.indexOf(label)]}99`
          ),
          borderColor: labels.map((label) =>
            isResidenceMatch(label)
              ? darkMode
                ? "rgba(255, 255, 0, 1)"
                : "rgba(255, 0, 0, 1)"
              : colors[labels.indexOf(label)]
          ),
          borderWidth: 1,
        },
      ],
    };
  }, [labels, colors, creditGrades, darkMode, isResidenceMatch]);

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || "";
              const value = context.raw;
              console.log("Tooltip - Label:", label, "Value:", value);
              return `${label}: ${
                typeof value === "number" ? value.toFixed(1) : value
              }`;
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
            color: (context) => {
              const label = context.tick && context.tick.label;
              if (!label) {
                console.log("Undefined label in x-axis tick");
                return darkMode ? "white" : "black";
              }
              return isResidenceMatch(label)
                ? darkMode
                  ? "#515fdd"
                  : "#079431"
                : darkMode
                ? "white"
                : "black";
            },
            font: (context) => {
              const label = context.tick && context.tick.label;
              return {
                weight: label && isResidenceMatch(label) ? "bold" : "normal",
              };
            },
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
    }),
    [darkMode, isResidenceMatch]
  );

  if (isLoading) return <Loading />;

  return (
    <Container>
      <ChartDiv>
        <Bar data={chartData} options={options} />
      </ChartDiv>
      {loadError && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "red",
            fontSize: "12px",
          }}
        >
          데이터 로딩 실패
        </div>
      )}
    </Container>
  );
};

export default ResidentStackedBarChart;
