import { jwtDecode } from "jwt-decode";

export const getUsuarioLogadoId = (): string | null => {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  if (!match) return null;

  try {
    const token = match[2];
    const payload: { userId: string } = jwtDecode(token);
    return payload.userId;
  } catch (err) {
    console.error("Erro ao decodificar token:", err);
    return null;
  }
};
