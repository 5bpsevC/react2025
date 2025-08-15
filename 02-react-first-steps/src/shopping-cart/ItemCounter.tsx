import { useState } from "react";
import "./itemCounter.css";

interface Props {
  product: string;
  quantity?: number;
}

export function ItemCounter({ product, quantity = 1 }: Props) {
  // Para cambiar el valor de count usamos setCount
  const [count, setCount] = useState(quantity);

  const handleAdd = () => {
    setCount(count + 1);
  };

  function handleSubstract() {
    if (count === 0) return;
    setCount(count - 1);
  }

  return (
    <section
      className="item-row"
      // style={{
      //   display: "flex",
      //   alignItems: "center",
      //   gap: 10,
      //   marginTop: 10,
      // }}
    >
      <span style={{ width: "150px" }}>{product}</span>
      <button onClick={handleAdd}>+1</button>
      <span>{count}</span>
      <button onClick={handleSubstract}>-1</button>
    </section>
  );
}
