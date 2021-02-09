import { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Svg from "./Svg";

const InputStyles = styled.input`
  font-family: var(--body-font);
  font-size: inherit;
  color: var(--light-very-dark-grayish-blue);
  width: 100%;
  border-radius: 5px;
  height: 3rem;
  border: none;
  margin: 0;
  padding: 0.5rem 0;
  text-indent: 65px;

  background-color: ${({ theme }) =>
    theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-desaturated-blue)`};
`;

const InputWrapper = styled.div`
  position: relative;
`;
const ButtonStyles = styled.button`
  font-family: var(--body-font);
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  cursor: pointer;
  background-color: var(--light-light-grayish-blue);
  color: var(--light-very-dark-grayish-blue);
  border: none;
  padding: 0.5rem;
`;

const CheckButtonStyles = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 100%;
  width: 22px;
  height: 22px;
  border: 2px var(--light-very-light-grayish-blue) solid;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const CheckButtonWrapper = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const SvgBackground = styled.div`
  background: var(--check-background);
  border-radius: 100%;
  width: inherit;
  height: inherit;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ inputActive }) => (inputActive ? 1 : 0)};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function Input(props) {
  const { theme, dispatch } = props;
  const [input, setInput] = useState("");
  const inputActive = Boolean(input);

  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "ADD_TODO", payload: { todo: input } });
    setInput("");
  };

  return (
    <InputWrapper>
      {/* TODO add label text */}
      <label />
      <CheckButtonWrapper>
        <CheckButtonStyles>
          <SvgBackground inputActive={inputActive}>
            <Svg name="check" />
          </SvgBackground>
        </CheckButtonStyles>
      </CheckButtonWrapper>

      <InputStyles
        type="text"
        theme={theme}
        onChange={handleOnChange}
        onKeyPress={handleKeyPress}
        value={input}
      />
      <ButtonStyles onClick={handleSubmit}>Enter</ButtonStyles>
    </InputWrapper>
  );
}

Input.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  dispatch: PropTypes.func.isRequired,
};
