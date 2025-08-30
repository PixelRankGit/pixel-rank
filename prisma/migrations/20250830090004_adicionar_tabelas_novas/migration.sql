-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN DEFAULT true,
    "naoAtivoDesde" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seguidor" (
    "id" TEXT NOT NULL,
    "seguidorId" TEXT NOT NULL,
    "seguindoId" TEXT NOT NULL,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Postagem" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Postagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comentario" (
    "id" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurtidaPost" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,

    CONSTRAINT "CurtidaPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Jogo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "steamId" INTEGER NOT NULL,
    "caminhoImagem" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ListaJogo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListaJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PostagemJogo" (
    "id" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,

    CONSTRAINT "PostagemJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ListaJogoJogo" (
    "id" TEXT NOT NULL,
    "listaJogoId" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,

    CONSTRAINT "ListaJogoJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nome_key" ON "public"."Usuario"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_nome_idx" ON "public"."Usuario"("nome");

-- CreateIndex
CREATE INDEX "Usuario_id_idx" ON "public"."Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_seguidorId_seguindoId_key" ON "public"."Seguidor"("seguidorId", "seguindoId");

-- CreateIndex
CREATE INDEX "Postagem_id_idx" ON "public"."Postagem"("id");

-- CreateIndex
CREATE INDEX "Comentario_postagemId_idx" ON "public"."Comentario"("postagemId");

-- CreateIndex
CREATE INDEX "Comentario_usuarioId_idx" ON "public"."Comentario"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "CurtidaPost_usuarioId_postagemId_key" ON "public"."CurtidaPost"("usuarioId", "postagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Jogo_steamId_key" ON "public"."Jogo"("steamId");

-- CreateIndex
CREATE INDEX "Jogo_nome_idx" ON "public"."Jogo"("nome");

-- CreateIndex
CREATE INDEX "Jogo_id_idx" ON "public"."Jogo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PostagemJogo_postagemId_jogoId_key" ON "public"."PostagemJogo"("postagemId", "jogoId");

-- CreateIndex
CREATE UNIQUE INDEX "ListaJogoJogo_listaJogoId_jogoId_key" ON "public"."ListaJogoJogo"("listaJogoId", "jogoId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- AddForeignKey
ALTER TABLE "public"."Seguidor" ADD CONSTRAINT "Seguidor_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seguidor" ADD CONSTRAINT "Seguidor_seguindoId_fkey" FOREIGN KEY ("seguindoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Postagem" ADD CONSTRAINT "Postagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "public"."Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurtidaPost" ADD CONSTRAINT "CurtidaPost_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CurtidaPost" ADD CONSTRAINT "CurtidaPost_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "public"."Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ListaJogo" ADD CONSTRAINT "ListaJogo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostagemJogo" ADD CONSTRAINT "PostagemJogo_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "public"."Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PostagemJogo" ADD CONSTRAINT "PostagemJogo_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "public"."Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ListaJogoJogo" ADD CONSTRAINT "ListaJogoJogo_listaJogoId_fkey" FOREIGN KEY ("listaJogoId") REFERENCES "public"."ListaJogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ListaJogoJogo" ADD CONSTRAINT "ListaJogoJogo_jogoId_fkey" FOREIGN KEY ("jogoId") REFERENCES "public"."Jogo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
