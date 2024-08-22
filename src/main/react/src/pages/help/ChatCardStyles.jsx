import styled from "styled-components";

export const CardContainer = styled.div`
  width: 200px;
  height: 100px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

export const CardText = styled.div`
  color: #333333;
  font-size: 16px;
  text-align: center;
  font-weight: 500;
`;
