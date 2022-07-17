import React from "react";
import styled from "styled-components/macro";

export default function ProgressBar({ completed }: { completed: number }) {
  const ProgressContainer = styled.div`
    height: 8px;
    margin-top: 20px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;
    position: relative;
  `;

  const Progressfiller = styled.div<{ completed: number }>`
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    width: ${completed}%;
    background-color: #ff7f37;
    border-radius: 6px;
    text-align: right;
  `;

  const Progresslabel = styled.div`
    padding: 10px 5px;
    font-size: 12px;
    color: white;
    font-weight: bold;
  `;

  const StatusStart = styled.span`
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 12px;
    color: white;
  `;

  const StatusEnd = styled.span`
    position: absolute;
    top: -20px;
    right: 0;
    font-size: 12px;
    color: white;
  `;

  return (
    <ProgressContainer>
      <Progressfiller completed={completed}>
        <Progresslabel>{`${completed}%`}</Progresslabel>
      </Progressfiller>
      <StatusStart>1</StatusStart>
      <StatusEnd>1B</StatusEnd>
    </ProgressContainer>
  );
}
