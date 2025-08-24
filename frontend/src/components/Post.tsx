import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart, FaRegHeart, FaPaperPlane, FaTrashAlt } from "react-icons/fa";

import { useComentarios, type ComentarioType } from "../hooks/useComentario";
import "../styles/component-css/Post.css";

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
}) => {
  const { comentarios = [], criarComentario, deletarComentario, loading } = useComentarios(id);
  const [novoComentario, setNovoComentario] = useState("");

  const handleEnviarComentario = () => {
    if (novoComentario.trim()) {
      criarComentario(novoComentario);
      setNovoComentario("");
    }
  };

  return (
    <div className="card mb-3 shadow-sm post-card" style={{ borderRadius: "12px" }}>
      <div className="card-body">
        {/* Conteúdo do post */}
        <p className="card-text">{conteudo}</p>

        {/* Jogos relacionados */}
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

        {/* Curtidas */}
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

        {/* Lista de comentários */}
        <div className="comentarios-list mb-3">
          {loading && <small>Carregando comentários...</small>}
          {(comentarios || []).map((c: ComentarioType) => (
          <div
            key={c.id}
            className="card mb-2 shadow-sm comentario-card p-2"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <strong>{c.usuario.nome}</strong>
                <p className="mb-1 comentario-texto">{c.conteudo}</p>
                <small className="text-muted">{new Date(c.criadoEm).toLocaleString()}</small>
              </div>
              <button
                className="btn btn-sm btn-outline-danger ms-2"
                onClick={() => deletarComentario(c.id)}
                title="Deletar comentário"
              >
                <FaTrashAlt />
      </button>
    </div>
  </div>
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
