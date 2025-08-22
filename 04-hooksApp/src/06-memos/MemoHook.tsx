import { Button } from "@/components/ui/button";
import { MySubTitle } from "./ui/MySubTitle";
import { MyTitle } from "./ui/MyTitle";
import { useCallback, useState } from "react";

export const MemoHook = () => {
  const [title, setTitle] = useState("Hola");
  const [subTitle, setSubTitle] = useState("Mundo");

  // useCallback es un hook de React que **memoriza una función** para que **no se vuelva a crear en cada render**, a menos que cambien sus dependencias
  // useCallback evita que se creen funciones nuevas
  const handleMyAPICall = useCallback(() => {
    console.log("Llamar a mi API - ", subTitle);
  }, [subTitle]);

  // Cuándo usar useCallback?
  // Pasás funciones a componentes que están optimizados con React.memo.
  // Usás funciones dentro de useEffect, useMemo, u otros hooks que dependen de funciones estables.
  // Querés optimizar renderizados en componentes hijos.

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h1 className="text-2xl font-thin text-white">MemoApp</h1>

      <MyTitle title={title} />
      <MySubTitle subtitle={subTitle} callMyAPI={handleMyAPICall} />

      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={() => setTitle("Hello, " + new Date().getTime())}
      >
        Cambiar título
      </Button>

      <Button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        // onClick={() => setSubTitle('World, ' + new Date().getTime())}
        onClick={() => setSubTitle("World")}
      >
        Cambiar subtitulo
      </Button>
    </div>
  );
};
