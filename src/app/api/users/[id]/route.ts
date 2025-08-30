// app/api/usuarios/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

const saltRounds = 10;

interface Params {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: params.id },
      select: { id: true, nome: true, email: true, criadoEm: true, atualizadoEm: true, naoAtivoDesde: true, ativo: true },
    });

    if (!usuario) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar usuário", error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  const { nome, email, senhaAtual, senhaNova } = await req.json();
  if (!senhaAtual) return NextResponse.json({ message: "Senha atual necessária" }, { status: 400 });

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: params.id } });
    if (!usuario) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaValida) return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });

    const novosDados: any = {};
    if (nome) novosDados.nome = nome;
    if (email && email !== usuario.email) {
      const emailExistente = await prisma.usuario.findUnique({ where: { email } });
      if (emailExistente) return NextResponse.json({ message: "Email já cadastrado" }, { status: 409 });
      novosDados.email = email;
    }
    if (senhaNova) novosDados.senha = await bcrypt.hash(senhaNova, saltRounds);

    const usuarioAtualizado = await prisma.usuario.update({ where: { id: params.id }, data: novosDados });
    return NextResponse.json({ message: "Usuário atualizado", usuario: usuarioAtualizado });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar usuário", error }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { senha } = await req.json();
  if (!senha) return NextResponse.json({ message: "Senha necessária" }, { status: 400 });

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: params.id } });
    if (!usuario) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    if (!usuario.ativo) return NextResponse.json({ message: "Usuário já está desativado" }, { status: 400 });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return NextResponse.json({ message: "Senha incorreta" }, { status: 401 });

    await prisma.usuario.update({
      where: { id: params.id },
      data: { ativo: false, naoAtivoDesde: new Date() },
    });

    return NextResponse.json({ message: "Usuário desativado com sucesso" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao desativar usuário", error }, { status: 500 });
  }
}
