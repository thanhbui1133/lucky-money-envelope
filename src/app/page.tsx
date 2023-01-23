"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { Input, InputField } from "@/components/Input";
import { useCallback, useState } from "react";
import { LMContainer } from "@/components/LMContainer";
import { useTags } from "@/hook/useTags";
import styled from "styled-components";

const TagItem = styled.div`
  border-radius: 8px;
  background-color: #e04336;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const TagButton = styled.button`
  height: 20px;
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Description = styled.p`
  font-style: italic;
  font-size: 14px;
  color: gray;
`;

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
`;

const Section = styled.div`
  margin-top: 42px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
`;

const PriceInput = styled(InputField)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;

  label {
    font-weight: 700;
  }

  input {
    width: 100px;
  }
`;

const SubmitButton = styled.button`
  border-radius: 8px;
  background-color: #e04336 !important;
  color: #f9c640;
  padding: 16px 10px;
  text-transform: uppercase;
  font-size: 24px;
  width: 100%;
`;

const BottonSection = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  left: 0;
  padding: 1rem 0;
`;

const Main = styled.main``;

export default function Home() {
  const { onTagKeyDown, onTagKeyUp, onTagChange, deleteTag, tags, tagInput } =
    useTags();

  const onSubmit = useCallback(() => {
    console.log("");
  }, []);

  return (
    <Main>
      <Header />
      <LMContainer>
        <form onSubmit={onSubmit}>
          <Section>
            <Label>Nhập danh sách</Label>
            <Description>
              Điền tiên từng người một, gõ xong ấn dấu phẩy (,) để thêm vào danh
              sách
            </Description>
            <TagWrapper>
              {tags.map((tag, index) => (
                <TagItem className="pl-3 pr-2 py-1 mr-2 my-1" key={tag}>
                  {tag}
                  <TagButton className="pl-3" onClick={() => deleteTag(index)}>
                    x
                  </TagButton>
                </TagItem>
              ))}
            </TagWrapper>
            <InputField
              className="mt-3 mb-6"
              value={tagInput}
              name="number"
              id="number"
              type={"text"}
              placeholder="Thêm người"
              onKeyDown={onTagKeyDown}
              onChange={onTagChange}
              onKeyUp={onTagKeyUp}
              fullWidth={true}
            />
          </Section>
          <Section>
            <Label>Nhập số lượng mệnh giá</Label>
            <div>
              <PriceInput
                label="20.000"
                inputMode="numeric"
                pattern="[0-9]*"
                name="number"
                id="number"
                type={"number"}
              />
            </div>
            <div>
              <PriceInput
                label="50.000"
                inputMode="numeric"
                pattern="[0-9]*"
                name="number"
                id="number"
                type={"number"}
              />
            </div>
            <div>
              <PriceInput
                label="100.000"
                inputMode="numeric"
                pattern="[0-9]*"
                name="number"
                id="number"
                type={"number"}
              />
            </div>
            <div>
              <PriceInput
                label="200.000"
                pattern="[0-9]*"
                inputMode="numeric"
                name="number"
                id="number"
                type={"number"}
              />
            </div>
            <div>
              <PriceInput
                label="500.000"
                inputMode="numeric"
                pattern="[0-9]*"
                name="number"
                id="number"
                type={"number"}
              />
            </div>
          </Section>
          <Section></Section>
          <BottonSection>
            <LMContainer>
              <SubmitButton type="submit">Gacha</SubmitButton>
            </LMContainer>
          </BottonSection>
        </form>
      </LMContainer>
    </Main>
  );
}
