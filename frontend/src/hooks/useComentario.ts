import { useState, useEffect } from "react";
import io from "socket.io-client";

export interface ComentarioType {
  id: string;
  conteudo: string;
  usuario: {
    id: string;
    nome: string;
  };
  criadoEm: string;
}

export const useComentarios = (postId: string) => {
  const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar comentários
  const fetchComentarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}/comentarios`, {
        method: "GET",
        credentials: "include", // obrigatório para enviar cookies httpOnly
      });
      if (!res.ok) throw new Error(`Erro ao buscar comentários: ${res.statusText}`);
      const data: ComentarioType[] = await res.json();
      setComentarios(data);
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  // Criar comentário
  const criarComentario = async (conteudo: string) => {
    if (!conteudo.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://194.163.181.133:3000/api/posts/${postId}/comentarios`, {
        method: "POST",
        credentials: "include", // essencial
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conteudo }),
      });

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

  // Deletar comentário
const deletarComentario = async (comentarioId: string) => {
  setLoading(true);
  setError(null);

  try {
    const res = await fetch(`http://194.163.181.133:3000/api/comentarios/${comentarioId}`, {
      method: "DELETE",
      credentials: "include", // essencial
    });

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

    const socket = io("http://194.163.181.133:3000", { withCredentials: true });

    socket.on("novoComentario", ({ postagemId, comentario }: { postagemId: string; comentario: ComentarioType }) => {
      if (postagemId === postId) {
        setComentarios(prev => [...prev, comentario]);
      }
    });

    return () => {
      socket.off("novoComentario");
      socket.disconnect();
    };
  }, [postId]);

  return {
    comentarios,
    setComentarios,
    loading,
    error,
    criarComentario,
    deletarComentario,
  };
};
