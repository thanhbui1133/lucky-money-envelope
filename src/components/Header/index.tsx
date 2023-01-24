import React from "react";

import Image from "next/image";
import styled from "styled-components";
import { LMContainer } from "../LMContainer";

interface Props {
  title: string;
}

const Wrapper = styled(LMContainer)`
  height: 70px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeaderText = styled.h1`
  font-size: 21px;
  line-height: 30px;
  text-transform: uppercase;
`;

const Header = ({ title = "Lì xì đến lì xì đến" }) => {
  return (
    <Wrapper>
      <Image
        src="/luckymoney.svg"
        alt="Lucky money"
        width={30}
        height={50}
        priority
      />
      <HeaderText className="ml-4">{title}</HeaderText>
    </Wrapper>
  );
};

export default React.memo(Header);
