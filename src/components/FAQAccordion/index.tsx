import React, { useState } from 'react';
import styled from "styled-components/macro";
import { ChevronUp, ChevronDown } from "react-feather";

const FAQcontainer = styled.div`
  padding: 1rem 0;
  border-bottom: 1px solid rgb(21, 24, 30);
  @media (min-width: 768px) {
    padding: 2rem 0;
  }
`;

const FAQTitleBox = styled.div`
  display: flex;
  justify-content: space-between;  
  user-select: none;
  cursor: pointer;
`;

const FAQTitle = styled.div`
  color: rgb(255, 255, 255);
  font-size: 18px;
  line-height: 1.5;
  font-family: "SF-Pro-Display-Semibold";
  font-weight: bold;
`;

const FAQContent = styled.div`
  color: rgb(119, 126, 137);
  font-size: 16px;
  font-weight: 400;
  padding-top: 1rem;
  font-family: "SF-Pro-Display-Light";
`;


type Props = {
  title: string;
  content: string;
};

const FAQAccordion = ( { title, content }: Props) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <FAQcontainer>
      <FAQTitleBox onClick={() => setIsActive(!isActive)}>
        <FAQTitle>{title}</FAQTitle>
        <div>{isActive ? <ChevronUp size={20} color="#d16b35" /> : <ChevronDown size={20} color="#d16b35" />}</div>
      </FAQTitleBox>
      {isActive && <FAQContent>{content}</FAQContent>}
    </FAQcontainer>
  );
};

export default FAQAccordion;