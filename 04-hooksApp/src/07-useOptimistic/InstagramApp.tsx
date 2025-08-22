import { startTransition, useOptimistic, useState, useTransition } from "react";
import { nanoid } from "nanoid";
import {
  Bookmark,
  Heart,
  Loader2,
  Loader2Icon,
  MessageSquare,
  MoreHorizontal,
  Send,
  Share2,
} from "lucide-react";
import { toast } from "sonner";

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

  // =========useTransition=========
  // useTransition actualizaciones que no bloquean la UI
  // isPending: Un booleano que indica si la transición está en curso.
  // startTransition: Una función que envuelve las actualizaciones de estado que deben ser tratadas como no urgentes.
  const [isPending, startTransition] = useTransition();

  //   ✅ Cuándo usar useTransition?
  // Se realizan filtrados o búsquedas en listas grandes.
  // Se cargan o actualizan datos pesados.
  // Se navega entre vistas con contenido dinámico.
  // Por ejemplo, al filtrar una lista de elementos mientras el usuario escribe en un campo de búsqueda, puedes envolver la actualización del estado del filtro en startTransition para que la UI no se congele mientras se actualiza la lista.

  // =========useOptimistic=========
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

    addOptimisticComment(messageText);

    startTransition(async () => {
      // simular la petición http al servidor
      await new Promise((resolve) => setTimeout(resolve, 3000));

      setComments((prev) => [
        ...prev,
        {
          id: nanoid(),
          text: messageText,
          author: "Lolo",
        },
      ]);

      //! Este sería el código para revertir el proceso
      // setComments((prev) => prev);
      // toast("Error al agregar el comentario", {
      //   description: "Intente nuevamente",
      //   duration: 10_000,
      //   position: "top-right",
      //   action: {
      //     label: "Cerrar",
      //     onClick: () => toast.dismiss(),
      //   },
      // });
    });
  };
  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-12 px-4 text-gray-800">
      {/* Post */}
      <div className="w-full max-w-2xl border border-gray-200 rounded-xl p-6">
        <div className="rounded-lg overflow-hidden mb-4">
          <img
            src="https://images.unsplash.com/photo-1755628931496-5b08b241567c?q=80&w=1228&auto=format&fit=crop"
            alt="Post"
            className="w-full h-64 object-cover"
          />
        </div>
        <p className="text-base font-medium mb-2">
          Mira que interesante esta funcionalidad de la API de React.
        </p>
        <div className="text-sm text-gray-500 flex justify-between items-center">
          <span>Hace 2 horas</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {comments.length}
          </span>
        </div>
      </div>

      {/* Comentarios */}
      <div className="w-full max-w-2xl mt-6 border border-gray-200 rounded-xl p-6">
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2 text-gray-700">
          <MessageSquare className="h-4 w-4" />
          Comentarios
        </h3>

        {comments.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">
            No hay comentarios aún.
          </p>
        ) : (
          <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {optimisticComments.map((comment) => (
              <li key={comment.id} className="flex items-start gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-semibold">
                  {comment.author?.[0] ?? "U"}
                </div>
                <div className="flex-1 border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">
                      {comment.author || "Usuario"}
                    </span>
                    <span className="text-xs text-gray-400">Hace 1 min</span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.text}</p>
                  {comment.optimistic && (
                    <span className="text-xs text-gray-400 flex items-center mt-1">
                      <Loader2Icon className="h-3 w-3 mr-1 animate-spin" />
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
        className="w-full max-w-2xl mt-6 border border-gray-200 rounded-xl p-6"
      >
        <label
          htmlFor="post-message"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Añadir comentario
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="post-message"
            id="post-message"
            placeholder="Escribe tu comentario..."
            required
            disabled={isPending}
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};
