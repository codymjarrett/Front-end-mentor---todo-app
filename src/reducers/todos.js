import produce from "immer";

import { mock_data } from "../mockData";

export const todosReducer = produce((draft = mock_data, action) => {
  const id = action?.payload?.id;
  const todo = draft.findIndex((t) => t.id === id);

  switch (action.type) {
    case "ADD_TODO": {
      const newTodo = action.payload.todo;
      draft.push({
        text: newTodo,
        completed: false,
        id: draft.length + 1,
      });
      break;
    }
    case "COMPLETE_TODO": {
      draft[todo].completed = true;
      break;
    }
    case "UNCOMPLETE_TODO": {
      draft[todo].completed = false;
      break;
    }
    case "REMOVE_TODO": {
      draft.splice(todo, 1);
      break;
    }

    default:
      return draft;
  }
});
