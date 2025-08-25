import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export interface Jogo {
  id: string;
  nome: string;
  caminhoImagem: string;
  steamId: string;
}

export interface Post {
  usuario: any;
  id: string;
  conteudo: string;
  jogos: Jogo[];
  qtCurtidas: number;
  jaCurtiu: boolean;
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>(
          "http://194.163.181.133:3000/api/posts",
          { withCredentials: true }
        );
        setPosts(res.data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();

    // Conectar Socket.IO
    const socket = io("http://194.163.181.133:3000", { withCredentials: true });

    socket.on("novaPostagem", (data: { postagem: Post }) => {
      setPosts(prev => [data.postagem, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { posts, loading, error, setPosts };
};
