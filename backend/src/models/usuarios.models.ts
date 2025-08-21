export type Usuario = {
	id: string;
	nome: string;
	email: string;
	criadoEm: string;
	atualizadoEm: string;
};

export type UsuarioCurtida = {
	id: string;
	postagemId: string;
	criadoEm: string;
};

export type UsuarioLista = {
	id: string;
	nome: string;
	criadoEm: string;
	atualizadoEm: string;
};

export type UsuarioSeguidor = {
	id: string;
	nome: string;
};

export type UsuarioSeguindo = {
	id: string;
	nome: string;
};
