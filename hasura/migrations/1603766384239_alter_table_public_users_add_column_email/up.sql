ALTER TABLE "public"."users" ADD COLUMN IF NOT EXISTS "email" citext NOT NULL UNIQUE;

ALTER TABLE "public"."users" ALTER COLUMN "email" TYPE citext;
