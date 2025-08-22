import { useOptimistic, useState } from "react";
import { nanoid } from "nanoid";

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
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {comments.length} comentarios
          </div>
        </div>
      </div>

      {/* Comentarios */}
      <div className="bg-white w-full max-w-xl p-6 mt-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
          Comentarios
        </h3>

        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              className="h-12 w-12 mx-auto mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          </div>
        ) : (
          <ul className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100">
            {comments.map((comment) => (
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
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
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
