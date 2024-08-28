import React, { useEffect, useState, useMemo } from "react";
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
import { defaultJobGroups } from "../data/defaultJobGroups";
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

const CreditGradeRadarChart = ({ userJob }) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";
  const [jobGroups, setJobGroups] = useState(defaultJobGroups);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const jobMapping = useMemo(
    () => ({
      1: "급여소득자",
      2: "개인사업자",
      3: "연금소득자",
      4: "주부",
      5: "전문직",
      6: "프리랜서",
      7: "무직",
      9: "기타",
    }),
    []
  );

  const userJobString = useMemo(
    () => jobMapping[userJob] || "기타",
    [userJob, jobMapping]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await DataVisualization.getCreditGradeRadarChart();
        const processedData = processApiData(response.data);
        setJobGroups(processedData);
        setLoadError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setJobGroups(defaultJobGroups);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processApiData = (data) => {
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

    return jobCategories.map((category) => ({
      label: category,
      grade: groupedData[category]
        ? groupedData[category].sum / groupedData[category].count
        : 0,
      count: groupedData[category] ? groupedData[category].count : 0,
    }));
  };

  if (isLoading) {
    return <Loading />;
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
          label === userJobString ? "#ff6384" : darkMode ? "#8290ee" : "#263ed8"
        ),
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        pointRadius: labels.map((label) => (label === userJobString ? 7 : 4)),
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

export default CreditGradeRadarChart;
