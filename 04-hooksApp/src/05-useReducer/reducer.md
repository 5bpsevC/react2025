# Reducer en React

En **React**, un **reducer** es una función que se utiliza para manejar el estado de un componente de manera **predecible y organizada**.  
Generalmente se usa junto con el hook `useReducer`, el cual es una alternativa a `useState` para manejar estados más **complejos** o que requieren **múltiples transiciones**.

---

## ¿Qué es un reducer?

Un reducer es una función que recibe dos parámetros:

1. **Estado actual** (state)
2. **Acción** (action) que describe qué queremos hacer con el estado

Y devuelve un **nuevo estado**.

```ts
function reducer(state, action) {
  switch (action.type) {
    case "INCREMENTAR":
      return { count: state.count + 1 };
    case "DECREMENTAR":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
```

---

## `useReducer` en React

La sintaxis básica es:

```ts
const [state, dispatch] = useReducer(reducer, estadoInicial);
```

- **state** → el estado actual.
- **dispatch** → función que se usa para enviar (dispatch) acciones al reducer.
- **reducer** → la función que decide cómo cambiar el estado.
- **estadoInicial** → el valor inicial del estado.

---

## Ejemplo 1: Contador simple

```tsx
import React, { useReducer } from "react";

type State = { count: number };
type Action = { type: "INCREMENTAR" } | { type: "DECREMENTAR" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "INCREMENTAR":
      return { count: state.count + 1 };
    case "DECREMENTAR":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function Contador() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "INCREMENTAR" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENTAR" })}>-</button>
    </div>
  );
}
```

---

## Ejemplo 2: Manejo de formulario

Los reducers también son útiles cuando el estado tiene **varias propiedades**.

```tsx
import React, { useReducer } from "react";

type State = { name: string; email: string };
type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "RESET":
      return { name: "", email: "" };
    default:
      return state;
  }
}

export default function Formulario() {
  const [state, dispatch] = useReducer(reducer, { name: "", email: "" });

  return (
    <form>
      <input
        type="text"
        placeholder="Nombre"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Correo"
        value={state.email}
        onChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
      />
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Resetear
      </button>
    </form>
  );
}
```

---

## ¿Cuándo usar `useReducer`?

- Cuando el estado es **complejo** (muchas propiedades o reglas).
- Cuando hay **múltiples formas** de actualizar el estado.
- Cuando quieres tener una **lógica clara y predecible** de cómo cambia el estado.

> Para estados simples (booleanos, contadores básicos, etc.) generalmente `useState` es suficiente.
> Para estados más complejos, `useReducer` es la mejor opción.

---
