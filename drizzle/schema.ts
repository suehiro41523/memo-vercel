import { pgTable, integer, jsonb, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const block = pgTable("block", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({
    name: "block_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  blockType: integer("block_type").default(1),
  order: integer(),
  content: jsonb().$type<{
    content: string;
  }>(),
  parent: text(),
});

export const blockType = pgTable("block_type", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({
    name: "block_type_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  blockTypeId: integer("block_type_id").default(1),
  blockTypeName: text("block_type_name"),
});

export const page = pgTable("page", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({
    name: "page_id_seq",
    startWith: 1,
    increment: 1,
    minValue: 1,
    maxValue: 2147483647,
    cache: 1,
  }),
  pageId: text("page_id"),
  pageTitle: text("page_title"),
  updateDatetime: timestamp("update_datetime", { mode: "string" }),
  createdDatetime: timestamp("created_datetime", { mode: "string" }),
  createUser: integer("create_user"),
});
