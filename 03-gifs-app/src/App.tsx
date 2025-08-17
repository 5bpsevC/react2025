import { GifsList, PreviousSearches } from "./gifs";
import { CustomHeader, SearchBar } from "./shared";
import { useGifs } from "./gifs/hooks/useGifs";

export function App() {
  const { gifs, previousTerms, handleTermClicked, handleSearch } = useGifs();

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

      <GifsList gifs={gifs} />
    </>
  );
}
