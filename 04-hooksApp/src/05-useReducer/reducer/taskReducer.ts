import { nanoid } from "nanoid";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

// state → el estado actual de tu aplicación (en este caso, las tareas).
interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

// action → un objeto que describe qué querés hacer con el estado (ej: agregar, borrar, modificar).
export type TaskAction =
  | { type: "ADD_TODO"; payload: { text: string } }
  | { type: "TOGGLE_TODO"; payload: { id: string } }
  | { type: "DELETE_TODO"; payload: { id: string } };

// Un reducer es simplemente una función pura que recibe dos cosas:
// (state, action) => newState
// state → el estado actual de tu aplicación (en este caso, las tareas).
// action → un objeto que describe qué querés hacer con el estado (ej: agregar, borrar, modificar).
// El reducer devuelve siempre un nuevo estado, nunca modifica el anterior directamente.
export const taskReducer = (
  state: TaskState,
  action: TaskAction
): TaskState => {
  switch (action.type) {
    case "ADD_TODO": {
      const newTodo: Todo = {
        id: nanoid(),
        text: action.payload.text,
        completed: false,
      };

      // ! No lo deben de hacer
      // state.todos.push(newTodo)

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case "DELETE_TODO": {
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id
      );

      // const completedTodos = currentTodos.filter((todo) => todo.completed).length;
      // const pendingTodos = currentTodos.length - completedTodos;

      return {
        ...state,
        todos: currentTodos,
        length: currentTodos.length,
        completed: currentTodos.filter((todo) => todo.completed).length,
        pending: currentTodos.filter((todo) => !todo.completed).length,
      };
    }

    case "TOGGLE_TODO": {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }
    default:
      return state;
  }
};
