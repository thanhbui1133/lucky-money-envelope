"use client";
import FlipCard from "@/components/FlipCard";
import Header from "@/components/Header";
import { LMContainer } from "@/components/LMContainer";
import { loadState } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const parseFormData = (data: any) => {
  return {
    tags: (data?.tags || []).map((item: string) => item),
    isShowEnvelope: data?.isShowEnvelope ? true : false,
    coinList: Object.keys(data?.coinList || {}).reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: {
          value: data?.coinList[curr]?.value || "0",
        },
      };
    }, {}),
  };
};

const Wrapper = styled.div`
  margin-top: 42px;
  margin-bottom: 8px;
  padding-bottom: 42px;
`;

const LuckeyMoneyItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

const ResultCard = styled.div`
  width: 100%;
  border-radius: 10px;
  position: relative;
  padding-top: 156.25%;
  background-color: #e04336;
`;

const CardText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  color: #f9c640;
  display: flex;
  align-items: center;
  justify-content: center;
  word-wrap: break-word;
  font-size: 28px;
`;

const Name = styled.h3`
  margin-bottom: 20px;
`;

const Result = () => {
  const [formData, setFormData] = useState({
    tags: [],
    isShowEnvelope: false,
    coinList: {
      20000: { value: "0" },
      50000: { value: "0" },
      100000: { value: "0" },
      200000: { value: "0" },
      500000: { value: "0" },
    } as { [key: string]: { value: string } },
  });
  const coinList = formData.coinList;

  useEffect(() => {
    const loadedState = parseFormData(loadState("_form"));
    setFormData(loadedState);
  }, []);

  const coinArray = useMemo(() => {
    return shuffleArray(
      Object.keys(coinList).reduce((prev, curr) => {
        const value = Number(coinList[curr].value);
        const newArr = isNaN(value) ? [] : Array(value).fill(curr);
        return [...prev, ...newArr];
      }, [] as string[])
    );
  }, [coinList]);

  return (
    <main>
      <Header title="Kết quả lì xì đây" />
      <LMContainer>
        <Wrapper className={"grid grid-cols-2 gap-10"}>
          {formData.tags.map((tag: string, index) => {
            return (
              <LuckeyMoneyItem key={tag}>
                <Name>{tag}</Name>
                {!formData.isShowEnvelope ? (
                  <ResultCard>
                    <CardText>
                      {Number(coinArray[index]).toLocaleString()}
                    </CardText>
                  </ResultCard>
                ) : (
                  <FlipCard value={Number(coinArray[index]).toLocaleString()} />
                )}
              </LuckeyMoneyItem>
            );
          })}
        </Wrapper>
      </LMContainer>
    </main>
  );
};

export default Result;
