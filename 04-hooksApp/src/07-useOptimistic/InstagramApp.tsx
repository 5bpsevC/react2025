import { useOptimistic, useState } from "react";
import { nanoid } from "nanoid";
import { Loader2Icon, MessageSquare } from "lucide-react";

interface Comment {
  id: string;
  text: string;
  optimistic?: boolean;
  author?: string;
}

export const InstagramApp = () => {
  const [comments, setComments] = useState<Comment[]>([
    { id: nanoid(), text: "¡Gran foto!", author: "Garfield" },
    { id: nanoid(), text: "Me encanta 🧡", author: "Colapinto" },
  ]);

  // `useOptimistic` permite mostrar un nuevo comentario en la UI de forma inmediata,
  // incluso antes de que se confirme en el servidor (optimistic UI update).
  // Esto mejora la experiencia de usuario al evitar esperas visuales.

  // `optimisticComments` representa el estado actual que ve el usuario, incluyendo
  // los comentarios ya confirmados + los que se están enviando.
  // `addOptimisticComment` es la función que agrega un nuevo comentario optimista.
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments, // estado real confirmado (por ejemplo, desde un Server Action o useState)
    (currentComments, newCommentText: string) => {
      return [
        ...currentComments,
        {
          id: nanoid(),
          text: newCommentText,
          author: "Lolo",
          optimistic: true,
        },
      ];
    }
  );

  const handleAddComment = async (formData: FormData) => {
    const messageText = formData.get("post-message") as string;
    console.log("Nuevo comentario: ", messageText);

    // modifica el comentario
    addOptimisticComment(messageText);

    // simular la petición http al servidor
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Mensaje grabado");
    setComments((prev) => [
      ...prev,
      {
        id: nanoid(),
        text: messageText,
      },
    ]);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 min-h-screen flex flex-col items-center py-12 px-4">
      {/* Post */}
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl p-6 transition-transform duration-300 hover:scale-[1.01]">
        <div className="overflow-hidden rounded-xl mb-5">
          <img
            src="https://images.unsplash.com/photo-1755628931496-5b08b241567c?q=80&w=1228&auto=format&fit=crop"
            alt="Post"
            className="object-cover w-full h-64 transition-transform duration-500 hover:scale-105"
          />
        </div>
        <p className="text-gray-800 font-semibold text-lg text-center">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Hace 2 horas</span>
          <div className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            {comments.length} comentarios
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="bg-white w-full max-w-xl p-6 mt-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Comentarios
        </h3>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="h-5 w-5 mr-2" />
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </div>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
            {optimisticComments.map((comment) => (
              <li
                key={comment.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 transition hover:bg-white shadow-sm"
              >
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full w-10 h-10 flex items-center justify-center text-white font-bold shadow">
                  {comment.author ? comment.author[0] : "U"}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-800">
                      {comment.author || "Usuario"}
                    </span>
                    <span className="text-xs text-gray-400">Hace 1 min</span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.text}</p>
                  {comment.optimistic && (
                    <span className="text-blue-500 text-xs mt-1 flex items-center animate-pulse">
                      <Loader2Icon className="h-5 w-5 mr-2" />
                      Enviando...
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Formulario */}
      <form
        action={handleAddComment}
        className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-6 mt-6"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Añadir comentario
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            name="post-message"
            placeholder="Escribe tu comentario..."
            required
            className="flex-1 p-3 rounded-xl bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition text-white px-4 py-3 rounded-xl font-semibold shadow-md"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
