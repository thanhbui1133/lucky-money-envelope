import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
}

export const Input = styled.input`
  border: 1px solid black;
`;

const Wrapper = styled.div``;

export const InputField: React.FC<Props> = ({
  label = "",
  id,
  className,
  fullWidth = false,
  ...rest
}) => {
  return (
    <Wrapper className={className}>
      {label !== "" && <label htmlFor={id}>{label}</label>}

      <Input
        className={`rounded-lg py-2 px-3 ${fullWidth ? "w-full" : ""}`}
        id={id}
        {...rest}
      />
    </Wrapper>
  );
};
