import { useRef } from "react";

// useRef: cambia el valor ➝ no causa re-render, solo actualiza la referencia

export function FocusScreen() {
  // Creamos una referencia para acceder directamente al input en el DOM
  // useRef guarda el nodo real (no dispara re-renders cuando cambia).
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    // Muestra en consola el valor que el usuario escribió en el input
    console.log(inputRef.current?.value);

    // Selecciona TODO el texto dentro del input
    inputRef.current?.select();

    // Si lo descomentas, también enfocaría el input
    // inputRef.current?.focus();
  };

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">Focus Screen</h1>

      <input
        ref={inputRef}
        type="text"
        className="bg-white text-black px-4 py-2 rounded-md"
        autoFocus // Cuando carga el componente, el cursor aparece dentro del input
      />

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={handleClick}
      >
        Set focus
      </button>
    </div>
  );
}
