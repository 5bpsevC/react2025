export interface User {
  id: string;
  name: string;
  location: string;
  role: string;
}

export const getUserAction = async (id: string) => {
  console.log("Función llamada");
  await new Promise((res) => setTimeout(res, 2000));

  console.log("Función resolvió");

  return {
    id: id,
    name: "Fernando Herrera",
    location: "Ottawa, Canadá",
    role: "Instructor de Software",
  };
};
