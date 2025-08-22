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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center py-12 px-4">
      {/* Post */}
      <Card className="w-full max-w-2xl mb-6">
        <CardContent className="p-6">
          <div className="rounded-md overflow-hidden mb-4">
            <img
              src="https://images.unsplash.com/photo-1755628931496-5b08b241567c?q=80&w=1228&auto=format&fit=crop"
              alt="Post"
              className="w-full h-64 object-cover"
            />
          </div>
          <p className="text-base font-medium mb-2">
            Mira que interesante esta funcionalidad de la API de React.
          </p>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Hace 2 horas</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              {comments.length}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Comentarios */}
      <Card className="w-full max-w-2xl mb-6">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Comentarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center">
              No hay comentarios aún.
            </p>
          ) : (
            <ScrollArea className="max-h-96 pr-2">
              <div className="space-y-4">
                {optimisticComments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {comment.author?.[0] ?? "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 border-b pb-3 border-muted">
                      <div className="flex justify-between text-sm font-medium">
                        <span>{comment.author ?? "Usuario"}</span>
                        <span className="text-xs text-muted-foreground">
                          Hace 1 min
                        </span>
                      </div>
                      <p className="text-sm text-foreground mt-1">
                        {comment.text}
                      </p>
                      {comment.optimistic && (
                        <div className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Loader2Icon className="h-3 w-3 mr-1 animate-spin" />
                          Enviando...
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Formulario */}
      <form action={handleAddComment} className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Añadir comentario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                type="text"
                name="post-message"
                placeholder="Escribe tu comentario..."
                required
                disabled={isPending}
                className="flex-1"
              />
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                ) : (
                  "Enviar"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
