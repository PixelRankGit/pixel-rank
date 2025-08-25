import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

export interface ComentarioType {
  id: string;
  conteudo: string;
  usuario: {
    id: string;
    nome: string;
  };
  criadoEm: string;
}

let socket: Socket | null = null;

export const useComentarios = (postId: string) => {
  const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComentarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://194.163.181.133:3000/api/posts/${postId}/comentarios`,
        { method: "GET", credentials: "include" }
      );
      if (!res.ok) throw new Error(`Erro ao buscar comentários: ${res.statusText}`);
      const data: ComentarioType[] = await res.json();
      setComentarios(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  const criarComentario = async (conteudo: string) => {
    if (!conteudo.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://194.163.181.133:3000/api/posts/${postId}/comentarios`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conteudo }),
        }
      );
      if (!res.ok) throw new Error(`Erro ao criar comentário: ${res.statusText}`);
      const novoComentario: ComentarioType = await res.json();
      setComentarios(prev => [...prev, novoComentario]);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarComentario = async (comentarioId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `http://194.163.181.133:3000/api/comentarios/${comentarioId}`,
        { method: "DELETE", credentials: "include" }
      );
      if (!res.ok) throw new Error(`Erro ao deletar comentário: ${res.statusText}`);
      setComentarios(prev => prev.filter(c => c.id !== comentarioId));
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComentarios();

    if (!socket) {
      socket = io("http://194.163.181.133:3000", { withCredentials: true });
    }

    const handleNovoComentario = ({ postagemId: pid, comentario }: { postagemId: string; comentario: ComentarioType }) => {
    if (pid === postId) {
      setComentarios(prev => {
        if (prev.some(c => c.id === comentario.id)) return prev;
        return [...prev, comentario];
      });
    }
  };
    socket.on("novoComentario", handleNovoComentario);

    return () => {
      socket?.off("novoComentario", handleNovoComentario);
    };
  }, [postId]);

  return { comentarios, setComentarios, loading, error, criarComentario, deletarComentario };
};
