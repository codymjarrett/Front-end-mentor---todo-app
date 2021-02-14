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
  border: 2px var(--light-very-light-grayish-blue) solid;
  position: relative;

  &:focus {
    outline: none;
  }
`;

const TextStyles = styled.span`
padding-left: 1rem;

${({ theme, completed }) => {
  if (completed) {
    if (theme === "dark") {
      return `
      text-decoration: line-through;
      color: var(--dark-dark-grayish-blue);
      `;
    } else {
      return `
      text-decoration: line-through;
      color: var(--light-dark-grayish-blue)
      `;
    }
  }

  if (theme === "light") {
    return `color: var(--light-very-dark-grayish-blue)`;
  }

  if (theme === "dark") {
    return `color: var(--dark-light-grayish-blue)`;
  }
}}

    
  };
`;

const TodoStyles = styled.li`
  ${({ theme }) => css`
    background-color: ${theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-desaturated-blue)`};
  `}
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px var(--light-light-grayish-blue) solid;

  :first-child {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
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
  opacity: ${({ completed }) => (completed ? 1 : 0)};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default function SingleTodo(props) {
  const {
    theme,
    dispatch,
    todos,

    todo: { text, completed, id },
  } = props;
  const isLight = theme === "light";

  const handleCompleteTodo = () => {
    if (!completed) {
      dispatch({ type: "COMPLETE_TODO", payload: { id } });
    } else {
      dispatch({ type: "UNCOMPLETE_TODO", payload: { id } });
    }
  };

  const handleRemoveTodo = () => {
    dispatch({ type: "REMOVE_TODO", payload: { id } });
  };

  return (
    <TodoStyles theme={theme}>
      <div>
        <CheckButtonStyles onClick={handleCompleteTodo} completed={completed}>
          <SvgBackground completed={completed}>
            <Svg name="check" />
          </SvgBackground>
        </CheckButtonStyles>
        <TextStyles theme={theme} completed={completed}>
          {text}
        </TextStyles>
      </div>
      <CrossButtonStyles theme={theme} onClick={handleRemoveTodo}>
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
