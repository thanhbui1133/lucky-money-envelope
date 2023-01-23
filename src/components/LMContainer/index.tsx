import styled from "styled-components";

const Wrapper = styled.div``;

export const LMContainer = ({
  className = "",
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Wrapper className={`container mx-auto px-4 md:px-0 ${className}`}>
      {children}
    </Wrapper>
  );
};
