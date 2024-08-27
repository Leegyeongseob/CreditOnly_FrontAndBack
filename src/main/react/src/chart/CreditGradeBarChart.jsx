import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import MemberAxiosApi from "../axiosapi/MemberAxiosApi";
import { useContext } from "react";
import { UserEmailContext } from "../contextapi/UserEmailProvider";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.commponent};
  transition: background-color 0.5s ease;
`;

// 샘플 데이터
const sampleAgeGroups = [
  { label: "10대", grade: 4 },
  { label: "20대", grade: 2 },
  { label: "30대", grade: 3 },
  { label: "40대", grade: 4 },
  { label: "50대", grade: 3 },
  { label: "60대", grade: 3 },
  { label: "70대", grade: 2 },
  { label: "80대", grade: 4 },
  { label: "90대 이후", grade: 3 },
];

const CreditGradeBarChart = ({ ageGroups = sampleAgeGroups }) => {
  const darkMode = localStorage.getItem("isDarkMode") === "true";
  const { email } = useContext(UserEmailContext);
  const [userAgeGroup, setUserAgeGroup] = useState("");
  //주민등록 번호를 가져와서 계산하는 axios함수
  const juminAxios = async () => {
    const response = await MemberAxiosApi.getJumin(email);
    const jumin = response.data.toString();
    try {
      if (!jumin || jumin.length < 6) {
        console.error("Invalid jumin:", jumin);
        return "";
      }

      const birthYear = parseInt(jumin.substring(0, 2));
      const birthMonth = parseInt(jumin.substring(2, 4));
      const birthDay = parseInt(jumin.substring(4, 6));

      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      const fullBirthYear =
        birthYear <= 23 ? 2000 + birthYear : 1900 + birthYear;
      let age = currentYear - fullBirthYear;

      if (
        currentMonth < birthMonth ||
        (currentMonth === birthMonth && currentDay < birthDay)
      ) {
        age--;
      }

      const ageGroupValue = Math.floor(age / 10) * 10;
      const calculatedAgeGroup =
        ageGroupValue >= 90 ? "90대 이후" : `${ageGroupValue}대`;

      console.log("Calculated Age Group:", calculatedAgeGroup);

      setUserAgeGroup(calculatedAgeGroup);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    juminAxios();
  }, []);
  const labels = ageGroups.map((group) => group.label);
  const grades = ageGroups.map((group) => group.grade);

  const barColors = labels.map((label) =>
    label === userAgeGroup
      ? darkMode
        ? "rgba(0, 123, 255, 0.8)"
        : "rgba(0, 123, 255, 0.8)"
      : darkMode
      ? "#8290ee"
      : "#263ed8"
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "신용등급",
        data: grades,
        backgroundColor: barColors,
        borderColor: barColors.map(() => "transparent"),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: darkMode ? "#fff" : "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const index = tooltipItem.dataIndex;
            const group = ageGroups[index];
            return `연령대: ${group.label}\n신용등급: ${group.grade}점`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.1)",
        },
      },
      y: {
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
          color: darkMode ? "#fff" : "#000",
        },
        grid: {
          color: darkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };
  return (
    <Container darkMode={darkMode}>
        <Bar data={chartData} options={options} />
    </Container>
  );
};

export default CreditGradeBarChart;
