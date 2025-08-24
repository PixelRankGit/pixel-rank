-- CreateTable
CREATE TABLE "public"."Comentario" (
    "id" VARCHAR(50) NOT NULL,
    "conteudo" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "postagemId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Comentario_postagemId_idx" ON "public"."Comentario"("postagemId");

-- CreateIndex
CREATE INDEX "Comentario_usuarioId_idx" ON "public"."Comentario"("usuarioId");

-- CreateIndex
CREATE INDEX "Jogo_id_idx" ON "public"."Jogo"("id");

-- CreateIndex
CREATE INDEX "Postagem_id_idx" ON "public"."Postagem"("id");

-- CreateIndex
CREATE INDEX "Usuario_id_idx" ON "public"."Usuario"("id");

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_postagemId_fkey" FOREIGN KEY ("postagemId") REFERENCES "public"."Postagem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
