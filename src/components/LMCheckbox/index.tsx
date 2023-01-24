import React from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Label = styled.label`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: inline-flex;
  align-items: center;
`;

const Text = styled.span`
  margin-left: 0.5rem;
  font-size: 14px;
  color: ${(p) => p.theme.textSecondary};
`;

const Input = styled.input`
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  margin: 0;
  font: inherit;
  width: 1.5rem;
  height: 1.5rem;
  border: 0.125rem solid #e04336;
  border-radius: 0.5rem;
  font-family: "lm-icon" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  position: relative;

  &::before {
    content: "";
  }

  &:checked {
    background-color: #e04336;

    &::before {
      position: absolute;
      top: calc(50% - 0.375rem);
      left: calc(50% - 0.375rem);
      content: "\\e900";
      color: white;
      font-size: 0.75rem;
    }
  }
`;

const LMCheckbox = React.forwardRef<any, Props>(
  ({ label = "", className, ...rest }, ref) => {
    return (
      <Label className={className}>
        <Input ref={ref} type="checkbox" {...rest} />
        <Text>{label}</Text>
      </Label>
    );
  }
);

LMCheckbox.displayName = "LMCheckbox";

export default React.memo(LMCheckbox);
