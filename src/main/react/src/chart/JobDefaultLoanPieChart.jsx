import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import DataVisualization from "../axiosapi/DataVisualization";
import Loading from "../pages/evaluation/Loading";

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

const JobDefaultLoanPieChart = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const darkMode = localStorage.getItem("isDarkMode") === "true";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await DataVisualization.getJobDefaultLoanPieChart();
        const rawData = response.data;

        const jobData = Object.values(jobMapping).reduce((acc, job) => {
          acc[job] = { total: 0, count: 0 };
          return acc;
        }, {});

        rawData.forEach((item) => {
          const job = jobMapping[item.HAC_CD] || "기타";
          jobData[job].total += item.Loan;
          jobData[job].count += 1;
        });

        const processedData = Object.entries(jobData).map(([job, data]) => ({
          job,
          count: data.count > 0 ? data.total / data.count : 0.2,
        }));

        // 데이터 값에 따라 내림차순 정렬
        processedData.sort((a, b) => b.count - a.count);

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("데이터를 불러오는 데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const data = useMemo(
    () => ({
      labels: chartData.map((item) => item.job),
      datasets: [
        {
          data: chartData.map((item) => item.count),
          backgroundColor: backgroundColor,
          borderColor: backgroundColor.map((color) =>
            color.replace("0.8", "1")
          ),
          borderWidth: 1,
        },
      ],
    }),
    [chartData]
  );

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
            return `${label}: ${percentage}% (${value.toFixed(2)})`;
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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorText>{error}</ErrorText>;
  }

  return (
    <Container>
      <ChartDiv>
        <Pie data={data} options={options} />
      </ChartDiv>
    </Container>
  );
};

export default JobDefaultLoanPieChart;
