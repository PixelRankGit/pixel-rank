import { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export interface Jogo {
  id: string;
  nome: string;
  caminhoImagem: string;
}

export interface Post {
  id: string;
  conteudo: string;
  jogos: Jogo[];
  qtCurtidas: number;
  jaCurtiu: boolean;
}

const socket = io("http://localhost:3000", { withCredentials: true });

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      socket.on("novoPost", (post: Post) => {
      setPosts(prev => [post, ...prev]);
    });
    const fetchPosts = async () => {
      try {
        const res = await axios.get<Post[]>('http://194.163.181.133:3000/api/posts', { withCredentials: true });
        console.log(res.data);
        setPosts(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || 'Erro ao buscar posts');
        console.log(err.message);
        socket.off("novoPost");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading, error, setPosts };
};