import { nanoid } from "nanoid";
import z from "zod";

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
  | { type: "ADD_TODO"; payload: string }
  | { type: "TOGGLE_TODO"; payload: string }
  | { type: "DELETE_TODO"; payload: string };

const TodoSchema = z.object({
  id: z.string(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateScheme = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem("tasks-state");

  if (!localStorageState) {
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // safeParse intenta validar un valor contra un esquema definido y te devuelve un resultado estructurado, sin lanzar errores
  const result = TaskStateScheme.safeParse(JSON.parse(localStorageState));

  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      completed: 0,
      pending: 0,
      length: 0,
    };
  }

  // ! Cuidado, porque el objeto puede haber sido manipulado
  return result.data;
};

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
        text: action.payload,
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
        (todo) => todo.id !== action.payload
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
        if (todo.id === action.payload) {
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
