import { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

import Hero from "./components/Hero";
import Container from "./components/Container";

import Title from "./components/Title";
import ThemeSwitch from "./components/ThemeSwitch";
import Input from "./components/Input";
import TodoShell from "./components/TodoShell";

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
  }
};

const AppStyles = styled.div`
  background-color: ${({ theme }) =>
    theme === "light"
      ? `var(--light-very-light-grayish-blue)`
      : `var(--dark-very-dark-blue)`};
  height: 100vh;
  width: 100%;
  position: relative;
`;

function App() {
  const [theme, setTheme] = useState("light");
  const [input, setInput] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("SHOW_ALL");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const todos = useSelector((state) => state.todos);

  const dispatch = useDispatch();

  const visibleTodos = getVisibleTodos(todos, visibilityFilter);

  const updateVisibilityFilter = (filter) => setVisibilityFilter(filter);

  return (
    <AppStyles theme={theme}>
      <Hero theme={theme} toggleTheme={toggleTheme} />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title />
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
        </div>
        <div style={{ marginTop: "4rem" }}>
          <Input theme={theme} dispatch={dispatch} />
          <TodoShell
            theme={theme}
            todos={visibleTodos}
            dispatch={dispatch}
            updateVisibilityFilter={updateVisibilityFilter}
            visibilityFilter={visibilityFilter}
          />
        </div>
      </Container>
    </AppStyles>
  );
}

export default App;
