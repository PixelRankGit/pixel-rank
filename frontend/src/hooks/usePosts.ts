import { useState, useEffect } from 'react';
import axios from 'axios';

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

export const usePosts = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get<any>('http://194.163.181.133:3000/api/posts', { withCredentials: true });
        console.log(res.data);
        setPosts(res.data);
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar posts');
        console.log(err.message);
      } finally {
        console.log('foi');
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading, error, setPosts };
};