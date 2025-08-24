import { Post } from "../components/Post";
import { usePosts } from "../hooks/usePosts";
import { useState, useEffect, useMemo } from "react";
import { Container } from "react-bootstrap";
import { NavMenu } from "../components/NavMenu";

import '../styles/route-css/MainPage.css'

export const MainPage = (): React.JSX.Element => {
  const { posts, loading, error, setPosts } = usePosts();
  const [modoEscuro, setModoEscuro] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [modoEscuro]);

  const ligarModoNoturno = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setModoEscuro(e.target.checked);
  };

  const handleCurtir = async (postId: string) => {
    try {
      await fetch(`http://194.163.181.133:3000/api/posts/${postId}/curtir`, {
        method: "POST",
        credentials: "include",
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, qtCurtidas: p.qtCurtidas + 1, jaCurtiu: true } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDescurtir = async (postId: string) => {
    try {
      await fetch(`http://194.163.181.133:3000/api/posts/${postId}/descurtir`, {
        method: "DELETE",
        credentials: "include",
      });
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId ? { ...p, qtCurtidas: p.qtCurtidas - 1, jaCurtiu: false } : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const safePosts = posts || [];

  // Embaralha posts para visualização aleatória
  const shuffledPosts = useMemo(() => {
    if (safePosts.length === 0) return [];
    return [...safePosts].sort(() => Math.random() - 0.5);
  }, [safePosts]);

  if (loading) return <p className="text-center mt-5">Carregando...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  return (
    <>
      <NavMenu
        search={search}
        setSearch={setSearch}
        ligarModoNoturno={ligarModoNoturno}
      />

      <Container
        fluid="sm"
        className="pt-5 mt-5 d-flex flex-column align-items-center gap-4"
        style={{ maxWidth: "700px" }}
      >
        {shuffledPosts.length > 0 ? (
          shuffledPosts.map((post) => (
            <div key={post.id} className="w-100">
              <Post {...post} onCurtir={handleCurtir} onDescurtir={handleDescurtir} />
            </div>
          ))
        ) : (
          <p className="text-center text-muted">Nenhum post encontrado.</p>
        )}

        <div className="text-center py-3 text-muted">
          Carregando mais posts...
        </div>
      </Container>
    </>
  );
};
