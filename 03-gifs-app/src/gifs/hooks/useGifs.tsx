import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";

export function useGifs() {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  // El useRef es un hook de React que se utiliza para persistir valores entre renders sin causar una re-renderización del componente.
  // Es muy útil cuando necesitas almacenar un valor mutable que no debe causar un nuevo render cuando cambia.
  const gifsCache = useRef<Record<string, Gif[]>>({});

  // Función asincrónica que se ejecuta cuando el usuario hace clic en un término (palabra clave de búsqueda)
  async function handleTermClicked(term: string) {
    // Verifica si ya existen GIFs almacenados en caché para ese término
    if (gifsCache.current[term]) {
      // Si ya están en caché, se actualiza el estado de los GIFs directamente con los datos almacenados
      setGifs(gifsCache.current[term]);

      // Termina la función aquí, no hace falta hacer una nueva solicitud
      return;
    }

    // Si no hay datos en caché, se hace una solicitud a la API (u otra fuente) para obtener los GIFs del término
    const gifs = await getGifsByQuery(term);

    // Se actualiza el estado de los GIFs con los datos recién obtenidos
    setGifs(gifs);

    // ⚠️ Posiblemente falta: guardar los GIFs en la caché para futuras búsquedas
    // gifsCache.current[term] = gifs; ← Esto ayudaría a guardar el resultado en caché
  }

  async function handleSearch(query: string) {
    query = query.trim().toLowerCase();
    if (query.length === 0) return;
    if (previousTerms.includes(query)) return;
    setPreviousTerms([query, ...previousTerms].splice(0, 8));

    const gifs = await getGifsByQuery(query);
    setGifs(gifs);
  }

  return {
    gifs,
    previousTerms,

    handleTermClicked,
    handleSearch,
  };
}
