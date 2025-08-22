import { use, type Usable } from "react";
import { type User } from "./api/get-user.action";

interface Props {
  getUser: Usable<User>;
}

export const ClientInformation = ({ getUser }: Props) => {
  // use es una API que nos permite leer un valor de una promesa o un context
  const user = use(getUser);

  //🧠 ¿Qué hace use()?
  // La función use() es parte de la nueva React API para Server Components y permite hacer esto:
  // Leer directamente el valor resuelto de una Promesa (por ejemplo, una función async como getUser()).
  // También puede leer valores de Context o Streams (más avanzado).
  // Es síncrono desde la perspectiva del componente — no necesitás useEffect, ni useState.

  // const user = await getUserAction(id)

  // useEffect(() => {
  //   getUserAction(id).then(console.log);
  // }, [id]);

  return (
    <div className="bg-gradient flex flex-col gap-4">
      <h2 className="text-4xl font-thin text-white">
        {user.name} - #{user.id}
      </h2>

      <p className="text-white text-2xl">{user.location}</p>
      <p className="text-white text-xl">{user.role}</p>
    </div>
  );
};
