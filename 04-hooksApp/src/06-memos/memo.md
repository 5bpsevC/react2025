# 🧠 ¿Qué es `useMemo` en React?

`useMemo` es un **hook** de React que permite **memorizar el resultado de una función** para evitar cálculos innecesarios cada vez que el componente se renderiza.

Es útil cuando tienes **funciones costosas o cálculos complejos** que no deberían ejecutarse en cada render, **a menos que ciertas dependencias cambien**.

---

## 🛠️ Sintaxis

```js
const memoizedValue = useMemo(() => {
  // cálculo costoso
  return resultado;
}, [dependencias]);
```

- Solo se vuelve a ejecutar si alguna de las `dependencias` cambia.
- Si las dependencias no cambian, se reutiliza el valor memorizado anterior.

---

## 📦 Ejemplo sencillo

Supongamos que tienes un componente que calcula el **doble de un número**:

```jsx
import { useState, useMemo } from "react";

function DobleNumero() {
  const [numero, setNumero] = useState(1);
  const [contador, setContador] = useState(0);

  const doble = useMemo(() => {
    console.log("Calculando doble...");
    return numero * 2;
  }, [numero]);

  return (
    <div>
      <h2>Doble: {doble}</h2>
      <button onClick={() => setNumero(numero + 1)}>Incrementar número</button>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar contador
      </button>
    </div>
  );
}
```

---

## 🧪 ¿Qué hace este ejemplo?

- Cuando haces clic en **"Incrementar número"**, el valor de `numero` cambia y se recalcula el doble.
- Pero si haces clic en **"Incrementar contador"**, como `numero` no cambió, el valor memorizado de `doble` se reutiliza, evitando el cálculo otra vez.

---

## ✅ ¿Cuándo usar `useMemo`?

Usá `useMemo` si:

- Hay **cálculos pesados o costosos**.
- El componente se **renderiza frecuentemente**.
- Querés **optimizar el rendimiento** evitando cálculos innecesarios.

## Sirve para Memorizar data, funciones y componentes
