const prisma = require('../prisma/prisma').default;
import { Usuario } from "@prisma/client";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const usuario: Usuario = await prisma.usuario.findUnique({
			where: { id },
			select: {
				id: true,
				nome: true,
				email: true,
				criadoEm: true,
				atualizadoEm: true
			}
		});
		if (!usuario) {
			return res.status(404).json({ message: 'Usuário não encontrado' });
		}
		res.json(usuario);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar usuário', error });
	}
};

export const getUserByNome = async (req: Request, res: Response) => {
	const { nome } = req.query;
	try {
		const usuarios: Usuario[] = await prisma.usuario.findMany({
			where: { nome: { contains: nome as string, mode: 'insensitive' } },
			select: {
				id: true,
				nome: true,
				email: true,
				criadoEm: true,
				atualizadoEm: true
			}
		});
		res.json(usuarios);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar usuários', error });
	}
};


