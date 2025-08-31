


"use client";

export const login = (): React.JSX.Element => {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <img src="/vercel.svg" alt="Logo" className="login-logo" />
                    <h1 className="pixelrank-title">PixelRank</h1>
                   
                </div>
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Seu email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input type="password" id="password" name="password" placeholder="Sua senha" required />
                    </div>
                    <button type="submit" className="login-btn">Entrar</button>
                </form>
                <div className="login-footer">
                    <a href="#" className="forgot-link">Esqueceu a senha?</a>
                    <span className="register-link">Não tem conta? <a href="/register">Cadastre-se</a></span>
                </div>
            </div>
            <style jsx>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(120deg, #000 0%, #ff0057 100%);
                }
                .login-container {
                    background: #fff;
                    border-radius: 20px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
                    padding: 48px 36px;
                    max-width: 600px;
                    width: 100%;
                    min-width: 340px;
                    display: flex;
                    flex-direction: column;
                    gap: 28px;
                }
                .login-header {
                    text-align: center;
                }
                .login-logo {
                    width: 56px;
                    margin-bottom: 10px;
                }
                .pixelrank-title {
                    font-size: 2.6rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #ff0057;
                    margin-bottom: 0;
                }
                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                label {
                    font-weight: 700;
                    color: #ff0057;
                    font-size: 1.05rem;
                }
                input {
                    padding: 12px 14px;
                    border-radius: 10px;
                    border: 2px solid #ff0057;
                    font-size: 1.05rem;
                    outline: none;
                    background: #f7f7f7;
                    color: #000;
                    transition: border 0.2s, box-shadow 0.2s;
                }
                input:focus {
                    border-color: #00ffd0;
                    box-shadow: 0 0 0 2px #00ffd044;
                }
                .login-btn {
                    background: linear-gradient(90deg, #ff0057 0%, #00ffd0 100%);
                    color: #fff;
                    font-weight: 800;
                    border: none;
                    border-radius: 10px;
                    padding: 14px;
                    font-size: 1.2rem;
                    cursor: pointer;
                    box-shadow: 0 2px 12px #ff005744;
                    transition: background 0.5s cubic-bezier(0.4,0,0.2,1), box-shadow 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1);
                }
                .login-btn:hover {
                    background: linear-gradient(90deg, #00ffd0 0%, #ff0057 100%);
                    box-shadow: 0 4px 24px #00ffd044;
                    transform: scale(1.04);
                }
                .login-footer {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                .forgot-link {
                    color: #00ffd0;
                    text-decoration: none;
                    font-size: 1rem;
                    font-weight: 600;
                }
                .forgot-link:hover {
                    text-decoration: underline;
                }
                .register-link {
                    color: #ff0057;
                    font-size: 1rem;
                    font-weight: 600;
                }
                .register-link a {
                    color: #00ffd0;
                    text-decoration: none;
                    font-weight: 700;
                }
                .register-link a:hover {
                    text-decoration: underline;
                }
                @media (max-width: 500px) {
                    .login-container {
                        padding: 28px 6px;
                    }
                    .pixelrank-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}

export default login