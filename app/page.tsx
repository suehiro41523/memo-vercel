import Image from "next/image";
import { neon } from "@neondatabase/serverless";

import "./globals.css";

export default async function Home() {
  async function create(formData: FormData) {
    "use server";
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get("comment");
    console.log(comment);
    if (!comment) return;

    // Insert the comment from the form into the Postgres database
    await sql`INSERT INTO block (content) VALUES (${comment})`;
  }
  async function getBlocks() {
    "use server";
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);

    const res = (await sql`select content from block`) as Array<{
      content: string;
    }>;
    return res;
  }
  const blocks = await getBlocks();
  console.log(blocks);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
        <form className=" bg-gray-700 px-4 py-2 rounded-md" action={create}>
          <input type="text" placeholder="write a comment" name="comment" />
          <button type="submit">Submit</button>
        </form>
        <ul className="flex flex-col gap-2">
          {blocks.map((block) => {
            return <div key={block.content}>{block.content}</div>;
          })}
        </ul>
      </main>
    </div>
  );
}
