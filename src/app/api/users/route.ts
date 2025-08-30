import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const nome = searchParams.get("nome");

  try {
    const usuarios = nome
      ? await prisma.usuario.findMany({
          where: { nome: { contains: nome, mode: "insensitive" } },
          select: { id: true, nome: true, email: true, criadoEm: true, atualizadoEm: true },
        })
      : await prisma.usuario.findMany({
          select: { id: true, nome: true, email: true, criadoEm: true, atualizadoEm: true },
        });

    if (!usuarios || usuarios.length === 0) {
      return NextResponse.json({ message: "Nenhum usuário encontrado" }, { status: 404 });
    }

    return NextResponse.json(usuarios);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar usuários", error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { nome, email, senha } = await req.json();

  if (!nome || !email || !senha) {
    return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
  }

  try {
    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
      return NextResponse.json({ message: "Email já cadastrado" }, { status: 409 });
    }

    const senhaHash = await bcrypt.hash(senha, saltRounds);
    await prisma.usuario.create({
      data: { nome, email, senha: senhaHash, ativo: true },
    });

    return NextResponse.json({ message: `Usuário ${nome} criado com sucesso` }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao criar usuário", error }, { status: 500 });
  }
}