/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameListGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostGame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PostLike` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFollow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."GameList" DROP CONSTRAINT "GameList_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GameListGame" DROP CONSTRAINT "GameListGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."GameListGame" DROP CONSTRAINT "GameListGame_gameListId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostGame" DROP CONSTRAINT "PostGame_gameId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostGame" DROP CONSTRAINT "PostGame_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostLike" DROP CONSTRAINT "PostLike_postId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PostLike" DROP CONSTRAINT "PostLike_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFollow" DROP CONSTRAINT "UserFollow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFollow" DROP CONSTRAINT "UserFollow_followingId_fkey";

-- DropTable
DROP TABLE "public"."Game";

-- DropTable
DROP TABLE "public"."GameList";

-- DropTable
DROP TABLE "public"."GameListGame";

-- DropTable
DROP TABLE "public"."Post";

-- DropTable
DROP TABLE "public"."PostGame";

-- DropTable
DROP TABLE "public"."PostLike";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserFollow";

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" VARCHAR(50) NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Seguidor" (
    "id" VARCHAR(50) NOT NULL,
    "seguidorId" TEXT NOT NULL,
    "seguindoId" TEXT NOT NULL,

    CONSTRAINT "Seguidor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Postagem" (
    "id" VARCHAR(50) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Postagem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CurtidaPost" (
    "id" VARCHAR(50) NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,

    CONSTRAINT "CurtidaPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Jogo" (
    "id" VARCHAR(50) NOT NULL,
    "nome" TEXT NOT NULL,
    "steamId" INTEGER NOT NULL,
    "caminhoImagem" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Jogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ListaJogo" (
    "id" VARCHAR(50) NOT NULL,
    "nome" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListaJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PostagemJogo" (
    "id" VARCHAR(50) NOT NULL,
    "postagemId" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,

    CONSTRAINT "PostagemJogo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ListaJogoJogo" (
    "id" VARCHAR(50) NOT NULL,
    "listaJogoId" TEXT NOT NULL,
    "jogoId" TEXT NOT NULL,

    CONSTRAINT "ListaJogoJogo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_nome_key" ON "public"."Usuario"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "public"."Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_nome_idx" ON "public"."Usuario"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Seguidor_seguidorId_seguindoId_key" ON "public"."Seguidor"("seguidorId", "seguindoId");

-- CreateIndex
CREATE UNIQUE INDEX "CurtidaPost_usuarioId_postagemId_key" ON "public"."CurtidaPost"("usuarioId", "postagemId");

-- CreateIndex
CREATE UNIQUE INDEX "Jogo_steamId_key" ON "public"."Jogo"("steamId");

-- CreateIndex
CREATE INDEX "Jogo_nome_idx" ON "public"."Jogo"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "PostagemJogo_postagemId_jogoId_key" ON "public"."PostagemJogo"("postagemId", "jogoId");

-- CreateIndex
CREATE UNIQUE INDEX "ListaJogoJogo_listaJogoId_jogoId_key" ON "public"."ListaJogoJogo"("listaJogoId", "jogoId");

-- AddForeignKey
ALTER TABLE "public"."Seguidor" ADD CONSTRAINT "Seguidor_seguidorId_fkey" FOREIGN KEY ("seguidorId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Seguidor" ADD CONSTRAINT "Seguidor_seguindoId_fkey" FOREIGN KEY ("seguindoId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Postagem" ADD CONSTRAINT "Postagem_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
