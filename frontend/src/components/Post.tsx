import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  onCurtir: (postId: string) => void;
  onDescurtir: (postId: string) => void;
  jaCurtiu: boolean;
}

export const Post: React.FC<PostProps> = ({
  id,
  conteudo,
  jogos,
  qtCurtidas,
  onCurtir,
  onDescurtir,
  jaCurtiu
}) => {
  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <p className="card-text">{conteudo}</p>

        {jogos?.length > 0 && (
          <div className="d-flex flex-wrap mb-3">
            {jogos.map((jogo) => (
              <div key={jogo.id} className="d-flex align-items-center border rounded p-1 me-2 mb-2">
                <img
                  src={jogo.caminhoImagem}
                  alt={jogo.nome}
                  className="img-fluid rounded me-2"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  onClick={() =>  window.open(`https://store.steampowered.com/app/${jogo.steamId}, '_blank'`)}
                />
                <span>{jogo.nome}</span>
              </div>
            ))}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center">
          <span>{qtCurtidas} curtidas</span>
          <button
            className={`btn ${jaCurtiu ? 'btn-danger' : 'btn-secondary'}`}
            onClick={() => (jaCurtiu ? onDescurtir(id) : onCurtir(id))}
          >
            {jaCurtiu ? 'Descurtir' : 'Curtir'}
          </button>
        </div>
      </div>
    </div>
  );
};
