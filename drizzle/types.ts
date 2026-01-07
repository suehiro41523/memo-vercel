import { InferSelectModel } from "drizzle-orm";
import { block } from "./schema";

export type Block = InferSelectModel<typeof block>;
