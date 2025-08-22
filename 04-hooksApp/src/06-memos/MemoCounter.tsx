import { useCounter } from "@/hooks/useCounter";
import { useMemo } from "react";

function heavyStuff(iterationNumber: number) {
  console.time("Heavy_stuff_started");

  for (let index = 0; index < iterationNumber; index++) {
    console.log("ahí vamos...");
  }

  console.timeEnd("Heavy_stuff_started");

  return `${iterationNumber} iteraciones realizadas`;
}

export const MemoCounter = () => {
  const { counter, increment } = useCounter(40);
  const { counter: counter2, increment: increment2 } = useCounter(10);

  // useMemo está memorizando el resultado de la función heavyStuff(counter)
  // de modo que solo se vuelve a ejecutar si cambia counter
  const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);

  // useMemo memoriza un valor
  // useCallback memoriza la function

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Memo - useMemo - {myHeavyValue}</h1>
      <hr />

      <h4>Counter: {counter}</h4>
      <h4>Counter2: {counter2}</h4>

      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment}
      >
        +1
      </button>
      <button
        className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer"
        onClick={increment2}
      >
        +1 - Counter2
      </button>
    </div>
  );
};
