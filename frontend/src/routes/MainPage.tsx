import { Post } from "../components/Post";
import { usePosts } from "../hooks/usePosts";
import { useNavigate } from "react-router";

export const MainPage = (): React.JSX.Element => {
    const { posts, loading, error, setPosts } = usePosts();

  const handleCurtir = async (postId: string) => {
    try {
      await fetch(`http://194.163.181.133:3000/api/posts/${postId}/curtir`, {
        method: 'POST',
        credentials: 'include'
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, qtCurtidas: p.qtCurtidas + 1, jaCurtiu: true } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const handleDescurtir = async (postId: string) => {
    try {
      await fetch(`http://194.163.181.133:3000/api/posts/${postId}/descurtir`, {
        method: 'DELETE',
        credentials: 'include'
      });
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, qtCurtidas: p.qtCurtidas - 1, jaCurtiu: false } : p))
      );
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          onCurtir={handleCurtir}
          onDescurtir={handleDescurtir}
        />
      ))}
      <button onClick={() => navigate('/login')}></button>
    </div>
  );
};