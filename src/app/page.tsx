"use client";
import Image from "next/image";
import Header from "@/components/Header";
import { Input, InputField } from "@/components/Input";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LMContainer } from "@/components/LMContainer";
import { useTags } from "@/hook/useTags";
import styled from "styled-components";
import LMCheckbox from "@/components/LMCheckbox";
import { useRouter } from "next/navigation";

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
  margin-bottom: 8px;
`;

const Label = styled.h2`
  text-transform: uppercase;
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 10px;
`;

const Section = styled.div`
  margin-top: 42px;
  margin-bottom: 8px;
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

const Main = styled.main``;

const Wrapper = styled.div`
  padding-bottom: 20px;
`;

const PriceInputComp = ({
  label = "",
  value = "",
  name = "",
  onChange = (e: any) => {},
}) => {
  return (
    <PriceInput
      label={label}
      inputMode="numeric"
      pattern="[0-9]*"
      name={name}
      id={`price_${name}`}
      type={"number"}
      value={value}
      placeholder={"Ex: 5"}
      onChange={onChange}
    />
  );
};

export function handleInputChange(
  event: any,
  setState: (v: any) => void,
  formRef:
    | React.RefObject<HTMLFormElement>
    | React.MutableRefObject<HTMLFormElement | undefined>
    | null,
  setValidity = (v: any) => {}
) {
  const input = event.currentTarget;
  if (event.currentTarget) {
    const value =
      input.type === "checkbox"
        ? event.currentTarget.checked
        : event.currentTarget.value.trim() !== ""
        ? event.currentTarget.value
        : event.currentTarget.value.trim();
    const name = input.name;
    if (formRef) {
      const form = formRef.current;
      if (input.checkValidity() === false) {
        if (form && form.checkValidity() === false) {
          setValidity(false);
        }
      } else {
        if (form && form.checkValidity() === true) {
          setValidity(true);
        }
      }
    }
    setState((prevState: any) => {
      return {
        ...prevState,
        [name]: {
          value: value,
          validated: true,
        },
      };
    });
  }
}

interface AddNewProps {
  isAddingNewPrice?: boolean;
}

const AddNewPrice = styled.div<AddNewProps>`
  background-color: #e04336 !important;
  color: white;
  border-radius: 8px;
  padding: 10px;
  width: ${(p) => (p.isAddingNewPrice ? "50%" : "100%;")}
  text-align: center;
  margin-bottom: 10px;
`;

const AddInput = styled(InputField)`
  input {
    width: 100%;
  }
`;

const AddNewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const PlusButton = styled.div`
  width: 47px;
  line-height: 24px;
  font-size: 20px;
  background-color: #e04336 !important;
  color: white;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
`;

export default function Home() {
  const [isShowEnvelope, setIsShowEnevelope] = useState(false);
  const [isShowAddingNewPrice, setIsShowAddingNewPrice] = useState(false);
  const [newPrice, setNewPrice] = useState("");
  const formRef = useRef<any>();
  const [isFormValid, setFormIsValid] = useState(false);

  const router = useRouter();

  const [coinList, setCoinList] = useState({
    "20000": {
      value: "",
    },
    "50000": {
      value: "",
    },
    "100000": {
      value: "",
    },
    "200000": {
      value: "",
    },
    "500000": {
      value: "",
    },
  } as { [key: string]: { value: string } });

  const { onTagKeyDown, onTagKeyUp, onTagChange, deleteTag, tags, tagInput } =
    useTags();

  const handleChange = useCallback((event: any) => {
    handleInputChange(event, setCoinList, formRef, setFormIsValid);
  }, []);

  const cashTotal = useMemo(() => {
    return Object.keys(coinList).reduce((prev, curr) => {
      const base = Number(curr);
      const value = Number(coinList[curr].value);
      const add = isNaN(value) ? 0 : value;
      return prev + add * base;
    }, 0);
  }, [coinList]);

  const cashTotalNumber = useMemo(() => {
    return Object.keys(coinList).reduce((prev, curr) => {
      const value = Number(coinList[curr].value);
      const add = isNaN(value) ? 0 : value;
      return prev + add;
    }, 0);
  }, [coinList]);

  const onSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      if (tags.length === 0) {
        alert("Số lượng điền số người");
        return;
      }
      if (cashTotalNumber < tags.length) {
        alert("Số lượng nhập vui lòng lớn hơn hoặc bằng số người");
        return;
      }
      const formData = {
        tags: tags,
        isShowEnvelope: isShowEnvelope,
        coinList: coinList,
      };
      localStorage.setItem("_form", JSON.stringify(formData));
      localStorage.setItem("_result", "");
      router.push("/result");
    },
    [cashTotalNumber, coinList, isShowEnvelope, router, tags]
  );

  const onChangeCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsShowEnevelope(e.target.checked);
    },
    []
  );

  const onShowAddNewPrice = useCallback(() => {
    setIsShowAddingNewPrice(!isShowAddingNewPrice);
  }, [isShowAddingNewPrice]);

  const onAddNewPrice = useCallback(() => {
    setCoinList((prevState: any) => {
      return {
        ...prevState,
        [newPrice]: {
          value: "",
        },
      };
    });
    setNewPrice("");
  }, [newPrice]);

  const handleNewPriceChange = useCallback((e: any) => {
    setNewPrice(e.currentTarget.value);
  }, []);

  return (
    <Main>
      <Header />
      <Wrapper>
        <LMContainer>
          <form onSubmit={onSubmit} ref={formRef}>
            <Section>
              <Label>Nhập danh sách</Label>
              <Description>
                Điền tiên từng người một, gõ xong ấn dấu phẩy (,) để thêm vào
                danh sách
              </Description>
              <TagWrapper>
                {tags.map((tag, index) => (
                  <TagItem className="pl-3 pr-2 py-1 mr-2 my-1" key={tag}>
                    {tag}
                    <TagButton
                      className="pl-3"
                      onClick={() => deleteTag(index)}
                    >
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
              <Description>
                Số lượng nhập vui lòng lớn hơn hoặc bằng số người
                <br />
                Số người hiện tại: {tags.length}
                <br />
                Tổng số tiền: {cashTotal.toLocaleString()}
                <br />
                Tổng số tờ tiền: {cashTotalNumber}
              </Description>
              <div>
                {Object.keys(coinList).map((item) => {
                  return (
                    <PriceInputComp
                      key={item}
                      label={Number(item).toLocaleString()}
                      name={item}
                      value={coinList[item].value}
                      onChange={handleChange}
                    />
                  );
                })}
              </div>
              {isShowAddingNewPrice && (
                <AddNewWrapper>
                  {
                    <AddInput
                      type="text"
                      value={newPrice}
                      onChange={handleNewPriceChange}
                      placeholder="Ex: 123000"
                    />
                  }
                  <PlusButton onClick={onAddNewPrice}>+</PlusButton>
                </AddNewWrapper>
              )}
              <AddNewPrice onClick={onShowAddNewPrice}>
                {isShowAddingNewPrice ? "Ẩn" : "Thêm mệnh giá"}
              </AddNewPrice>
              <LMCheckbox
                label="Hiển thị phong bao lì xì (tăng kịch tính)"
                checked={isShowEnvelope}
                onChange={onChangeCheck}
              />
            </Section>
            <Section>
              <SubmitButton type="submit">Gacha</SubmitButton>
            </Section>
          </form>
        </LMContainer>
      </Wrapper>
    </Main>
  );
}
