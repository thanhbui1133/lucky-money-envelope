import React, { useState } from "react";
import styled from "styled-components";
import luckyMoney from "../../../public/image/envelope/type1.png";
import Image from "next/image";

const WrapperContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 189%;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const Wrapper = styled.div`
  background-color: transparent;
  width: 100%;
  perspective: 1000px;

  .flip-card-inner {
    transform: rotateY(180deg);
  }
`;

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const Base = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
`;

const Front = styled(Base)`
  background-color: #bbb;
  color: black;
  border-radius: 8px;
`;

const Back = styled(Base)`
  background-color: #2980b9;
  color: black;
  transform: rotateY(180deg);
`;

const ResultCard = styled.div`
  width: 100%;
  border-radius: 10px;
  position: relative;
  padding-top: 189%;
  background-color: #e04336;
`;

const CardText = styled(ContentContainer)`
  color: #f9c640;
  word-wrap: break-word;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e04336;
`;

const FlipCard = ({ value = "0" }) => {
  const [isFlip, setIsFlip] = useState(false);

  const onClick = () => {
    setIsFlip(true);
  };

  return (
    <WrapperContainer>
      <ContentContainer>
        <Wrapper onClick={onClick}>
          <Inner className={isFlip ? "flip-card-inner" : ""}>
            <Front>
              <Image src={luckyMoney} alt="Picture of luckyMoney" />
            </Front>
            <Back>
              <ResultCard>
                <CardText>{value}</CardText>
              </ResultCard>
            </Back>
          </Inner>
        </Wrapper>
      </ContentContainer>
    </WrapperContainer>
  );
};

export default React.memo(FlipCard);
