import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrashAlt } from 'react-icons/fa';

import '../styles/component-css/Comentario.css'

interface ComentarioProps {
  id: string;
  conteudo: string;
  usuario: {
    id: string;
    nome: string;
  };
  criadoEm: string;
  onDeletar: (comentarioId: string) => void;
  deletavel?: boolean;
}

export const Comentario: React.FC<ComentarioProps> = ({
  id,
  conteudo,
  usuario,
  criadoEm,
  onDeletar,
  deletavel = false
}) => {
  return (
    <div className="card mb-2 shadow-sm comentario-card" style={{ borderRadius: '12px' }}>
      <div className="card-body p-2">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <strong>{usuario.nome}</strong>
            <p className="mb-1 comentario-texto">{conteudo}</p>
            <small className="text-muted">{new Date(criadoEm).toLocaleString()}</small>
          </div>
          {deletavel && (
            <button
              onClick={() => onDeletar(id)}
              title="Deletar comentário"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#dc3545',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <FaTrashAlt />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
