import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import Svg from "../components/Svg";

const ButtonStyles = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CrossButtonStyles = styled(ButtonStyles)`
  img {
    ${({ theme }) => css`
      color: ${theme === "light"
        ? `var(--dark-very-dark-blue)`
        : `var(--dark-light-grayish-blue)`};
    `};
  }
`;

const CheckButtonStyles = styled(ButtonStyles)`
  border-radius: 100%;
  width: 22px;
  height: 22px;

  &:focus {
    outline: none;
  }

  ${({ complete }) => css`
    border: ${complete
      ? "none"
      : `2px var(--light-very-light-grayish-blue) solid`};
    background: ${({ complete }) => complete && `var(--check-background)`};
  `}
`;

const TextStyles = styled.span`
  ${({ theme }) => css`
    color: ${theme === "light"
      ? `var(--dark-very-dark-blue)`
      : `var(--dark-light-grayish-blue)`};
  `};
  padding-left: 1rem;
`;

const TodoStyles = styled.li`
  ${({ theme }) => css`
    background-color: ${theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-blue)`};
  `}
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 2px var(--light-dark-grayish-blue) solid;

  :first-child {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
`;

const CheckboxStyles = styled.input`
  width: 22px;
  height: 22px;
  border-radius: 100%;
`;

export default function SingleTodo(props) {
  const {
    theme,
    dispatch,
    todos,

    todo: { text, complete, id },
  } = props;
  const isLight = theme === "light";

  const handleCompleteTodo = () => {
    if (!complete) {
      dispatch({ type: "completeTodo", payload: { id } });
    } else {
      dispatch({ type: "unCompleteTodo", payload: { id } });
    }
  };

  return (
    <TodoStyles theme={theme}>
      <div>
        <CheckButtonStyles onClick={handleCompleteTodo} complete={complete}>
          {complete && <Svg name="check" />}
        </CheckButtonStyles>
        <TextStyles theme={theme}>{text}</TextStyles>
      </div>
      <CrossButtonStyles theme={theme}>
        <Svg
          name="cross"
          color={isLight ? "" : `var(--dark-light-grayish-blue)`}
        />
      </CrossButtonStyles>
    </TodoStyles>
  );
}

SingleTodo.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  todo: PropTypes.shape({
    text: PropTypes.string.isRequired,
    complete: PropTypes.bool.isRequired,
  }),
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      id: PropTypes.number,
    })
  ),
};
