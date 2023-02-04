import styled, { css } from "styled-components";

export const Container = styled.div`
  margin: 0px auto;
  max-width: 95vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: 2px;
`;

export const BarChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export const Chart = css`
  margin-top: 10px;
  // width: 56px;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 420px) {
    // width: 34px;
  }
`;

export const Number = styled.span`
  font-size: 1rem;
  text-align: center;
  color: black;
`;

export const MakeBar = styled.div`
  height: ${(props) => props.height}%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.width}vw;
  ${Chart};
`;