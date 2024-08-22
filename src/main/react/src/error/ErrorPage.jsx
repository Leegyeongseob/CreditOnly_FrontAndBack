import { useLocation } from "react-router-dom";
import styled from "styled-components";
import fourHundred from "../img/error/400error.png";
import fourHundredOne from "../img/error/401error.png";
import fourHundredThree from "../img/error/403error.png";
import fourHundredFour from "../img/error/404error.png";
import fiveHundred from "../img/error/500error.png";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: ${({ error }) => {
    switch (error) {
      case 400:
        return `url(${fourHundred})`;
      case 401:
        return `url(${fourHundredOne})`;
      case 403:
        return `url(${fourHundredThree})`;
      case 404:
        return `url(${fourHundredFour})`;
      case 500:
        return `url(${fiveHundred})`;
      default:
        return "none";
    }
  }};
  background-size: cover;
  background-position: center;
`;

const ErrorPage = () => {
  const location = useLocation();
  const { error } = location.state || {};

  return <PageContainer error={error} />;
};

export default ErrorPage;
