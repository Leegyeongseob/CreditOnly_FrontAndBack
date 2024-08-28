import React, { useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styled from "styled-components";
import DataVisualization from "../axiosapi/DataVisualization";
import Loading from "../pages/evaluation/Loading";
import { defaultPieChartData } from "../data/defaultPieChartData";

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

const JobDefaultLoanPieChart = ({ userJob }) => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const darkMode = localStorage.getItem("isDarkMode") === "true";

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

        processedData.sort((a, b) => b.count - a.count);

        setChartData(processedData);
        setLoadError(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(defaultPieChartData);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [jobMapping]);

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

  const options = useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "right",
          labels: {
            generateLabels: (chart) => {
              const datasets = chart.data.datasets;
              return chart.data.labels.map((label, index) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(index);
                return {
                  text: label,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: false,
                  index: index,
                  fontColor:
                    label === userJobString
                      ? darkMode
                        ? "#515fdd"
                        : "#079431"
                      : darkMode
                      ? "#fff"
                      : "#333",
                  fontWeight: label === userJobString ? "bold" : "normal",
                };
              });
            },
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
    }),
    [darkMode, userJobString]
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container>
      <ChartDiv>
        <Pie data={data} options={options} />
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

export default JobDefaultLoanPieChart;
