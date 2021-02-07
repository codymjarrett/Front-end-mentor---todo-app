import PropTypes from "prop-types";
import styled from "styled-components";

import SingleTodo from "./SingleTodo";

const TodoShellStyles = styled.ul`
  margin-top: 1rem;
  background-color: var(--light-very-light-gray);
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

export default function TodoShell(props) {
  const { theme, todos, dispatch } = props;

  return (
    <TodoShellStyles>
      {todos.map((todo, index) => (
        <SingleTodo theme={theme} todo={todo} dispatch={dispatch} key={index} />
      ))}
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
