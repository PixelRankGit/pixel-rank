import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";

import { useComentarios, type ComentarioType } from "../hooks/useComentario";
import { Comentario } from "./Comentario";
import "../styles/component-css/Post.css";
import { useAuth } from "../context/authContext";

interface Jogo {
  id: string;
  nome: string;
  caminhoImagem: string;
  steamId: string;
}

interface PostProps {
  id: string;
  conteudo: string;
  jogos: Jogo[];
  qtCurtidas: number;
  jaCurtiu: boolean;
  usuario: string;
  onCurtir: (postId: string) => void;
  onDescurtir: (postId: string) => void;
}

export const Post: React.FC<PostProps> = ({
  id,
  conteudo,
  jogos = [],
  qtCurtidas,
  jaCurtiu,
  onCurtir,
  onDescurtir,
  usuario,
}) => {
  const { comentarios = [], criarComentario, deletarComentario, loading } = useComentarios(id);
  const [novoComentario, setNovoComentario] = useState("");
  const { userId: usuarioLogadoId } = useAuth();

  const handleEnviarComentario = () => {
    if (!novoComentario.trim()) return;
    criarComentario(novoComentario);
    setNovoComentario("");
  };

  console.log("usuarioLogadoId:", usuarioLogadoId);
  console.log("comentario.usuario.id:", comentarios.map(c => c.usuario.id));


  const comentariosFiltrados = comentarios.reduce<ComentarioType[]>((acc, cur) => {
    if (!acc.some(c => c.id === cur.id)) acc.push(cur);
    return acc;
  }, []);

  return (
    <div className="card mb-3 shadow-sm post-card" style={{ borderRadius: "12px" }}>
      <div className="card-body">
        <p className="fw-bold mb-1">{usuario}</p>
        <p className="card-text">{conteudo}</p>

        {jogos.length > 0 && (
          <div className="d-flex flex-wrap mb-3">
            {jogos.map((jogo) => (
              <div
                key={jogo.id}
                className="d-flex align-items-center border rounded-pill p-1 me-2 mb-2 jogo-tag"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  window.open(`https://store.steampowered.com/app/${jogo.steamId}`, "_blank")
                }
              >
                <img
                  src={jogo.caminhoImagem}
                  alt={jogo.nome}
                  className="img-fluid rounded-circle me-2"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                <span>{jogo.nome}</span>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center mb-3">
          <span>{qtCurtidas} {qtCurtidas === 1 ? "curtida" : "curtidas"}</span>
          <button
            className={`btn d-flex align-items-center ${jaCurtiu ? "btn-danger" : "btn-outline-secondary"}`}
            onClick={() => (jaCurtiu ? onDescurtir(id) : onCurtir(id))}
          >
            {jaCurtiu ? <FaHeart className="me-1" /> : <FaRegHeart className="me-1" />}
            {jaCurtiu ? "Descurtir" : "Curtir"}
          </button>
        </div>

        <div className="comentarios-list mb-3">
          {loading && <small>Carregando comentários...</small>}
          {comentariosFiltrados.map((c: ComentarioType) => (
            <Comentario
              key={c.id}
              id={c.id}
              conteudo={c.conteudo}
              usuario={c.usuario}
              criadoEm={c.criadoEm}
              deletavel={c.usuario.id === usuarioLogadoId}
              onDeletar={deletarComentario}
            />
          ))}
        </div>

        <div className="d-flex mt-2">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Adicione um comentário..."
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEnviarComentario()}
          />
          <button className="btn btn-primary" onClick={handleEnviarComentario}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};
