import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import SingleTodo from "./SingleTodo";

const TodoShellStyles = styled.ul`
  margin-top: 1rem;
  background-color: var(--light-very-light-gray);
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const TodoStyles = styled.li`
  ${({ theme }) => css`
    background-color: ${theme === "light"
      ? `var(--light-very-light-gray)`
      : `var(--dark-very-dark-desaturated-blue)`};
  `}
  padding: 1.5rem;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

const TextStyles = styled.span`
  color: var(--light-dark-grayish-blue);
`;

const ButtonStyles = styled.span`
  color: var(--light-dark-grayish-blue);
  background: transparent;
  border: none;
  cursor: pointer;
`;

export default function TodoShell(props) {
  const { theme, todos, dispatch } = props;

  const numOfTodos = todos.length;

  const handleClearComplete = () => {
    dispatch({ type: "CLEAR_COMPLETED" });
  };

  const getNumberOfTodosText = () => {
    if (numOfTodos == 1) {
      return `1 item left`;
    }
    return `${numOfTodos} items left`;
  };

  return (
    <TodoShellStyles>
      {todos.map((todo, index) => (
        <SingleTodo theme={theme} todo={todo} dispatch={dispatch} key={index} />
      ))}
      <TodoStyles theme={theme}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextStyles>{getNumberOfTodosText()}</TextStyles>
          {todos.length > 0 && (
            <ButtonStyles onClick={handleClearComplete}>
              Clear Completed
            </ButtonStyles>
          )}
        </div>
      </TodoStyles>
    </TodoShellStyles>
  );
}

TodoShell.propTypes = {
  theme: PropTypes.oneOf(["light", "dark"]).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
    })
  ),
  dispatch: PropTypes.func.isRequired,
};
