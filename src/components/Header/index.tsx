import React from "react";

import Image from 'next/image'
import styled from "styled-components";
import { LMContainer } from "../LMContainer";

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

const Header = () => {
    return (
        <Wrapper >
            <Image
              src="/luckymoney.svg"
              alt="Lucky money"
              width={30}
              height={50}
              priority
            />
            <HeaderText className="ml-4">
                Lì xì đến lì xì đến
            </HeaderText>
        </Wrapper>
    //     <div className={styles.description}>
    //     <p>
    //       Get started by editing&nbsp;
    //       <code className={styles.code}>app/page.tsx</code>
    //     </p>
    //     <div>
    //       <a
    //         href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         By{' '}
    //         <Image
    //           src="/vercel.svg"
    //           alt="Vercel Logo"
    //           className={styles.vercelLogo}
    //           width={100}
    //           height={24}
    //           priority
    //         />
    //       </a>
    //     </div>
    //   </div>
    )
}

export default React.memo(Header);