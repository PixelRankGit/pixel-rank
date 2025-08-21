-- AlterTable
ALTER TABLE "public"."Usuario" ADD COLUMN     "ativo" BOOLEAN,
ADD COLUMN     "naoAtivoDesde" TIMESTAMP(3);
