# 🔁 ¿Qué es `useCallback` en React?

`useCallback` es un **hook** de React que **memoriza una función** para que **no se vuelva a crear en cada render**, a menos que cambien sus dependencias.

Esto es especialmente útil cuando:

- Pasás funciones como props a componentes hijos.
- Usás funciones en efectos (`useEffect`).
- Querés evitar renders innecesarios o problemas de rendimiento.

---

## 🛠️ Sintaxis

```js
const funcionMemorizada = useCallback(() => {
  // lógica de la función
}, [dependencias]);
```

---

## 📦 Ejemplo simple

```jsx
import React, { useState, useCallback } from "react";

function Boton({ onClick, texto }) {
  console.log("Botón renderizado");
  return <button onClick={onClick}>{texto}</button>;
}

function Contador() {
  const [contador, setContador] = useState(0);
  const [mensaje, setMensaje] = useState("Hola");

  // useCallback evita que esta función se vuelva a crear en cada render
  const incrementar = useCallback(() => {
    setContador((prev) => prev + 1);
  }, []);

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <input
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe algo"
      />
      <Boton onClick={incrementar} texto="Incrementar contador" />
    </div>
  );
}
```

---

## 🧪 ¿Qué hace este ejemplo?

- `incrementar` se memoriza con `useCallback`, por lo que **no se vuelve a crear** a menos que sus dependencias cambien.
- El componente `Boton` **solo se re-renderiza si la función cambia**. Gracias a `useCallback`, evitamos renders innecesarios.
- Cambiar el input (`mensaje`) **no afecta al botón** porque `incrementar` no cambia.

---

## 🧠 Diferencia entre `useMemo` y `useCallback`

| Hook          | Memoriza...          | Uso principal                        |
| ------------- | -------------------- | ------------------------------------ |
| `useMemo`     | Un **valor/cálculo** | Evitar cálculos innecesarios         |
| `useCallback` | Una **función**      | Evitar que se creen funciones nuevas |

---

## ✅ ¿Cuándo usar `useCallback`?

Usalo cuando:

- Pasás funciones a componentes que están **optimizados con `React.memo`**.
- Usás funciones dentro de **`useEffect`, `useMemo`, u otros hooks** que dependen de funciones estables.
- Querés **optimizar renderizados** en componentes hijos.

---
