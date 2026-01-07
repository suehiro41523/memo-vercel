-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "block" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "block_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"block_type" integer DEFAULT 1,
	"children" integer[],
	"order" integer,
	"content" jsonb[]
);
--> statement-breakpoint
CREATE TABLE "block_type" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "block_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"block_type_id" integer DEFAULT 1,
	"block_type_name" text
);
--> statement-breakpoint
CREATE TABLE "page" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "page_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"page_id" text,
	"page_title" text,
	"update_datetime" timestamp,
	"created_datetime" timestamp,
	"create_user" integer
);

*/