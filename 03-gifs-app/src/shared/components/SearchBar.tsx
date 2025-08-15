import { useEffect, useState, type KeyboardEvent } from "react";

interface Props {
  placeholder?: string;
  onQuery: (query: string) => void; // Función que se llama cuando se hace una búsqueda
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
  // Estado para almacenar el texto actual del input
  const [query, setQuery] = useState("");

  // useEffect que se ejecuta cada vez que cambia `query` o `onQuery`
  useEffect(() => {
    // Crea un temporizador de 700ms antes de ejecutar `onQuery`
    // Esto se llama "debounce" y evita llamar la función en cada tecla presionada
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    // Limpia el temporizador si `query` cambia antes de que se cumpla el tiempo
    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]); // Dependencias: se ejecuta si cambian query o onQuery

  // Función que ejecuta la búsqueda inmediatamente
  const handleSearch = () => {
    onQuery(query);
    // setQuery(''); // opcional para limpiar el input después de buscar
  };

  // Función que detecta si se presiona "Enter" y ejecuta la búsqueda
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Renderiza la barra de búsqueda
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
