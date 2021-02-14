import PropTypes from "prop-types";
import styled, { css } from "styled-components";

import SingleTodo from "./SingleTodo";
import Footer, { MobileFilter } from "./Footer";

const TodoShellStyles = styled.ul`
  margin-top: 1rem;
  background-color: var(--light-very-light-gray);
  width: 100%;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export default function TodoShell(props) {
  const {
    theme,
    todos,
    dispatch,
    updateVisibilityFilter,
    visibilityFilter,
  } = props;

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
    <>
      <TodoShellStyles>
        {todos.map((todo, index) => (
          <SingleTodo
            theme={theme}
            todo={todo}
            dispatch={dispatch}
            key={index}
          />
        ))}
        <Footer
          theme={theme}
          todos={todos}
          getNumberOfTodosText={getNumberOfTodosText}
          handleClearComplete={handleClearComplete}
          updateVisibilityFilter={updateVisibilityFilter}
          visibilityFilter={visibilityFilter}
        />
      </TodoShellStyles>
      <MobileFilter
        theme={theme}
        dispatch={dispatch}
        updateVisibilityFilter={updateVisibilityFilter}
        visibilityFilter={visibilityFilter}
      />
    </>
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
  updateVisibilityFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.oneOf([
    "SHOW_ALL",
    "SHOW_COMPLETED",
    "SHOW_ACTIVE",
  ]),
};
