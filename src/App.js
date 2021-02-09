import { useState, useReducer } from "react";
import styled from "styled-components";
import produce from "immer";

import Hero from "./components/Hero";
import Container from "./components/Container";

import Title from "./components/Title";
import ThemeSwitch from "./components/ThemeSwitch";
import Input from "./components/Input";
import TodoShell from "./components/TodoShell";

import { mock_data } from "./mockData";

const todos = [
  {
    text: "Complete online Javascript course",
    complete: false,
    id: 1,
  },
  {
    text: "Jog around the park 3x",
    complete: false,
    id: 2,
  },
  {
    text: "10 minutes meditation",
    complete: false,
    id: 3,
  },
  {
    text: "Read for 1 hour",
    complete: false,
    id: 4,
  },
  {
    text: "Pick up groceries",
    complete: false,
    id: 5,
  },
  {
    text: "Complete Todo App on Frontend Mentor",
    complete: false,
    id: 6,
  },
];

const getInitialState = () => {
  return {
    todos,
  };
};

const todosReducer = (draft, action) => {
  const id = action?.payload?.id;
  const todo = draft.todos.findIndex((todo) => todo.id === id);

  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = action.payload.todo;
      draft.todos.push({
        text: newTodo,
        complete: false,
        id: draft.todos.length + 1,
      });
      break;
    }
    case "COMPLETE_TODO": {
      draft.todos[todo].complete = true;
      break;
    }
    case "UNCOMPLETE_TODO": {
      draft.todos[todo].complete = false;
      break;
    }
    case "REMOVE_TODO": {
      draft.todos.splice(todo, 1);
      break;
    }
    case "CLEAR_COMPLETED": {
      draft.todos = draft.todos.filter((todo) => todo.complete !== true);
      break;
    }
  }
};

const curriedTodosReducer = produce(todosReducer);

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

  const [state, dispatch] = useReducer(curriedTodosReducer, getInitialState());
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const todos = state.todos;

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
          <TodoShell theme={theme} todos={todos} dispatch={dispatch} />
        </div>
      </Container>
    </AppStyles>
  );
}

export default App;
