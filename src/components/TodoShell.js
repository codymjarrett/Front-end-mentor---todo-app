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
`;

export default function TodoShell(props) {
  const { theme, todos, dispatch } = props;

  const numOfTodos = todos.length;

  return (
    <TodoShellStyles>
      {todos.map((todo, index) => (
        <SingleTodo theme={theme} todo={todo} dispatch={dispatch} key={index} />
      ))}
      <TodoStyles theme={theme}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
            {numOfTodos > 1 ? `${numOfTodos} items left` : `1 item left`}
          </span>
          <button>Clear Completed</button>
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
