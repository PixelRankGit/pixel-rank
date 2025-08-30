import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { senha } = await req.json();

  if (!senha) return NextResponse.json({ message: "Senha necessária" }, { status: 400 });

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: params.id } });
    if (!usuario) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    if (usuario.ativo) return NextResponse.json({ message: "Usuário já está ativado" }, { status: 400 });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });

    await prisma.usuario.update({
      where: { id: params.id },
      data: { ativo: true, naoAtivoDesde: null },
    });

    return NextResponse.json({ message: "Usuário ativado com sucesso" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao ativar usuário", error }, { status: 500 });
  }
}
