const prisma = require('../prisma/prisma').default;
const bcrypt = require('bcrypt');

const saltRounds: number = 10;

import { Usuario } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { error } from "console";
import { Request, Response } from "express";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
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
			res.status(404).json({ message: 'Usuário não encontrado' });
			return;
		}
		res.json(usuario);
		return;
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar usuário', error });
		return;
	}
};

export const getUserByNome = async (req: Request, res: Response): Promise<void> => {
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
		if (!usuarios){
			res.status(404).json({ message: "Nenhum usuário foi encontrado" });
		}
		res.json(usuarios);
	} catch (error) {
		res.status(500).json({ message: 'Erro ao buscar usuários', error });
	}
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
	const { nome, email, senha } = req.body;
	if (!nome || !email || !senha){
		res.status(400).json({});
		return;
	}
	try {
		const usuarioExistente = await prisma.usuario.findUnique({
            where: { email }
        });

        if (usuarioExistente) {
            res.status(409).json({ message: 'Email já cadastrado' });
            return;
        }
		const senhaHash = await bcrypt.hash(senha, saltRounds);
		const novoUser = await prisma.usuario.create({
			data: { nome, email, senha: senhaHash}
		});
		res.status(201).json({ message: `O Usuário ${nome} foi adicionado`});
	} catch (error){
		res.status(500).json({ message: 'Erro ao inserir usuário' });
	}
};

export const attUser = async (req: Request, res: Response): Promise<void> => {
	const { nome, email, senhaAtual, senhaNova } = req.body;
	const { id } = req.params;

	if (!senhaAtual) {
		res.status(400).json({ message: 'É necessário informar a senha!'});
		return;
	}
	try {

		const usuario: Optional<Usuario> = await prisma.usuario.findUnique({
			where: {
				id
			}
		});

		if (!usuario){
			res.status(404).json({ message: "Usuário não encontrado"});
			return;
		}

		const senhaValida: boolean = await bcrypt.compare(senhaAtual, usuario.senha);
		if (!senhaValida){
			res.status(401).json({ message: "Senha Incorreta"});
			return;
		}

		const novosDados: any = {};
        if (nome) novosDados.nome = nome;
        if (email && email !== usuario.email) {

            const emailExistente = await prisma.usuario.findUnique({ where: { email } });
            if (emailExistente) {
                res.status(409).json({ message: 'Email já cadastrado' });
                return;
            }
            novosDados.email = email;
        }
        if (senhaNova) {
            novosDados.senha = await bcrypt.hash(senhaNova, saltRounds);
        }

        const usuarioAtualizado = await prisma.usuario.update({
            where: { id },
            data: novosDados
        });

        res.status(200).json({ message: 'Usuário atualizado', usuario: usuarioAtualizado });
		return;
	} catch (error: unknown) {
		res.status(500).json({ message: `Erro ao atualizar o usuário ${nome} | Erro: ${error}`});
		return;
	}
};

export const desativarUser = async (req: Request, res: Response): Promise<void> => {

};


