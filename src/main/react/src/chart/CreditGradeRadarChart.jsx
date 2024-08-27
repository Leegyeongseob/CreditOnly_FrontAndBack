import React, { useEffect, useState } from "react";
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
import DataVisualization from "../axiosapi/DataVisualization";
import Loading from "../pages/evaluation/Loading";

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

const CreditGradeRadarChart = ({ userJob = "급여소득자" }) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";
  const [jobGroups, setJobGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await DataVisualization.getCreditGradeRadarChart();
        console.log("API Response:", response.data);

        const processedData = processApiData(response.data);
        setJobGroups(processedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processApiData = (data) => {
    const jobMapping = {
      1: "급여소득자",
      2: "개인사업자",
      3: "연금소득자",
      4: "주부",
      5: "전문직",
      6: "프리랜서",
      7: "무직",
      9: "기타",
    };
    const jobCategories = Object.values(jobMapping);

    const groupedData = data.reduce((acc, item) => {
      const job = jobMapping[item.HAC_CD] || "기타";
      if (!acc[job]) {
        acc[job] = { sum: 0, count: 0 };
      }
      acc[job].sum += parseFloat(item.CB);
      acc[job].count += 1;
      return acc;
    }, {});

    // 모든 직업 카테고리를 포함하도록 데이터 처리
    return jobCategories.map((category) => ({
      label: category,
      grade: groupedData[category]
        ? groupedData[category].sum / groupedData[category].count
        : 0,
      count: groupedData[category] ? groupedData[category].count : 0, // 데이터 수 추가
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  const labels = jobGroups.map((group) => group.label);
  const grades = jobGroups.map((group) => 11 - group.grade);

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
        pointRadius: labels.map(
          (label) => (label === userJob ? 7 : 4) // 본인의 직업의 점 크기를 7로 설정, 나머지는 4로 설정
        ),
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
            return `직업: ${group.label}\n신용등급: ${group.grade.toFixed(
              1
            )}등급\n데이터 수: ${group.count}`;
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
          backdropColor: darkMode ? "#242424" : "#fff",
          callback: function (value) {
            return 11 - value;
          },
        },
      },
    },
  };

  return (
    <Container darkMode={darkMode}>
      <Radar data={chartData} options={options} />
    </Container>
  );
};

export default CreditGradeRadarChart;
