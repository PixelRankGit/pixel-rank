import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { FaEye } from 'react-icons/fa'

import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/route-css/Login.css';

import Icone from '../assets/iconeproj128.png';

import axios from 'axios';

export const Login = (): React.JSX.Element => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [verSenha, setVerSenha] = useState(false);

    const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get('http://194.163.181.133:3000/api/login', { withCredentials: true });
        console.log(res.data);
        if (res.data.loggedIn) {
          navigate('/');
        }
      } catch {
      }
    };
    checkAuth();
  }, [navigate]);

  const verSenhaF = (): void => {
    setVerSenha((prev) => {
    const novoValor = !prev;
    document.getElementById('senha')?.setAttribute('type', novoValor ? 'text' : 'password');
    return novoValor;
  });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://194.163.181.133:3000/api/login',
        { email, senha },
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
      console.log(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-hero">
          <div className="login-logo">{Icone}</div>
          <div>
            <h3 className="login-title">PixelRank</h3>
            <p className="login-sub">Entre para continuar — é rápido e divertido</p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control login-input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              
            />
          </div>

          <div className="mb-3">
            <label id='labelsenha' htmlFor="senha" className="form-label">Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                type={verSenha ? "text" : "password"}
                className="form-control login-input"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                style={{ paddingRight: '44px' }}
              />
              <button
                type='button'
                onClick={() => setVerSenha(!verSenha)}
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  height: '100%',
                  border: 'none',
                  background: 'transparent',
                  color: '#b22784',
                  fontWeight: 700,
                  padding: '0 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                tabIndex={-1}
                aria-label={verSenha ? 'Ocultar senha' : 'Ver senha'}
              >
                <FaEye />
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn w-100">Entrar</button>
        </form>

        <div className="login-footer">
          <p>Não tem conta? <a href="/register">Crie uma aqui</a></p>
        </div>
      </div>
    </div>
  );
}