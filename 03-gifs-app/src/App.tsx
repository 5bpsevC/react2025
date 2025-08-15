import { useState } from "react";
import { GifsList, PreviousSearches } from "./gifs";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader, SearchBar } from "./shared";

export function App() {
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  function handleTermClicked(term: string) {
    console.log({ term });
  }

  function handleSearch(query: string) {
    console.log({ query });
  }

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      <SearchBar placeholder="Busca lo que quieras" onQuery={handleSearch} />

      <PreviousSearches
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifsList gifs={mockGifs} />
    </>
  );
}
