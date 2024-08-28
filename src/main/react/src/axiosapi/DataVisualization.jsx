import PythonAxiosInstance from "./PythonAxiosInstance";

//파이썬에서 시각화 데이터 가져오는 axios
const DataVisualization = {
  //파이썬으로 신용등급평가 입력 데이터 보내는 함수
  postCreditInput: async (formData) => {
    const data = {
      HAC_CD: formData.jobType,
      C00000052: formData.recentCreditAccounts,
      CA1200001: formData.creditCardInstitutions.year1,
      CA2400001: formData.creditCardInstitutions.year2,
      CA3600001: formData.creditCardInstitutions.year3,
      L22002700: formData.unpaidLoans.under5M3Months,
      L22002800: formData.unpaidLoans.under10M3Months,
      L22002900: formData.unpaidLoans.under5M6Months,
      L22003000: formData.unpaidLoans.under10M6Months,
      L22003100: formData.unpaidLoans.under5M1Year,
      L22003200: formData.unpaidLoans.under10M1Year,
      LA1200017: formData.loanExperience.subrogation,
      LA1200018: formData.loanExperience.writeOff,
      LA1200019: formData.loanExperience.sale,
      LA1200020: formData.loanExperience.debtRestructuring,
      LA1200021: formData.loanExperience.bankruptcy,
      LA1200022: formData.loanExperience.accelerationClause,
      LA6000005: formData.loanExperience.transferTermination,
      L00000001: formData.totalUnpaidLoans,
    };
    return await PythonAxiosInstance.post("/creditInput", data);
  },
  //직업별 신용등급
  getCreditGradeRadarChart: async () => {
    return await PythonAxiosInstance.get("/evaluation/jobs");
  },
  // 신용등급 평가(머신러닝)
  getCreditScoreChart: async () => {
    return await PythonAxiosInstance.get("");
  },
  // 신용카드 별 신용 등급
  getCreditScoreScatterChart: async () => {
    return await PythonAxiosInstance.get("/evaluation/credit_card");
  },
  // 신용등급 평가(머신러닝)
  getDoughnutChart: async () => {},
  // 직업별 미상환 대출 비율
  getJobDefaultLoanPieChart: async () => {
    return await PythonAxiosInstance.get("/evaluation/jobs_and_loans");
  },
  // 거주지별 신용등급
  getResidentStackedBarChart: async () => {
    return await PythonAxiosInstance.get("/evaluation/residence");
  },
};
export default DataVisualization;
