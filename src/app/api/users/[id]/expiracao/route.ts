import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: params.id },
      select: { naoAtivoDesde: true },
    });

    if (!usuario) return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });

    return NextResponse.json({ dataExpiracao: usuario.naoAtivoDesde });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao buscar data de expiração", error }, { status: 500 });
  }
}