import { useState, useReducer } from "react";
import Hero from "./components/Hero";
import Container from "./components/Container";

import Title from "./components/Title";
import ThemeSwitch from "./components/ThemeSwitch";
import Input from "./components/Input";
import TodoShell from "./components/TodoShell";

import { mock_data } from "./mockData";

const initialState = mock_data;

function reducer(state, action) {
  switch (action.type) {
    case "completeTodo":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.complete = true;
        }
        return todo;
      });
    case "unCompleteTodo":
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.complete = false;
        }
        return todo;
      });
  }
}

function App() {
  const [theme, setTheme] = useState("light");
  const [input, setInput] = useState("");

  const [state, dispatch] = useReducer(reducer, initialState);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div
      className="App"
      style={{ height: "100vh", width: "100%", position: "relative" }}
    >
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
          <Input theme={theme} />
          <TodoShell theme={theme} todos={state} dispatch={dispatch} />
        </div>
      </Container>
    </div>
  );
}

export default App;
