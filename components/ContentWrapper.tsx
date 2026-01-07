"use client";

import { Block } from "@/drizzle/types";
import { BLOCK_TYPE } from "@/lib/constants/ui";
import { debounce } from "@/lib/utils/debounce";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { FocusEventHandler, FormEvent } from "react";

export default function ContentWrapper() {
  const queryClient = new QueryClient();

  // 返り値がないのでmutation
  const create = useMutation({
    mutationFn: createBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });

  const update = useMutation({
    mutationFn: updateBlock,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["block"] });
    },
  });

  const blocks = useQuery({
    queryKey: ["block"],
    queryFn: getBlocks,
  });

  async function getBlocks(): Promise<Block[]> {
    const res = await fetch("/api/block", {
      method: "GET",
    });
    if (!res.ok) throw new Error("fetch failed");
    return res.json();
  }

  async function createBlock(block: Partial<Block>) {
    await fetch("/api/block", {
      method: "POST",
      body: JSON.stringify({ ...block }),
    });
  }

  async function updateBlock(block: Partial<Block>) {
    await fetch("/api/block", {
      method: "PATCH",
      body: JSON.stringify({ ...block }),
    });
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await create.mutateAsync({
      blockType: BLOCK_TYPE.TEXT,
      parent: "",
      order: 1000,
      content: { content: formData.get("comment") as string },
    });
    await blocks.refetch();

    e.currentTarget.reset();
  };

  const onChangeDebounceFn = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return;
      const form = e.target;

      update.mutateAsync({
        id: Number(form.id),
        blockType: BLOCK_TYPE.TEXT,
        parent: "",
        order: 1000,
        content: { content: form.value },
      });
      await blocks.refetch();
    },
    1200
  );
  const onChange: FocusEventHandler<HTMLInputElement> = async (e) => {
    onChangeDebounceFn(e);
  };

  if (blocks.isLoading) return <div>Loading...</div>;
  if (blocks.error) return <div>Error</div>;
  return (
    <QueryClientProvider client={queryClient}>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="write a comment" name="comment" />
        <button type="submit">Submit</button>
      </form>
      <div className="flex flex-col gap-2">
        {blocks.data?.map((block) => {
          // ブロックの種類に応じて表示を分別する
          if (block.blockType === BLOCK_TYPE.TEXT) {
            return (
              <input
                className="w-full outline-none focus:ouline-none"
                key={block.id}
                id={String(block.id)}
                defaultValue={block.content?.content}
                onChange={onChange}
              />
            );
          }
        })}
      </div>
    </QueryClientProvider>
  );
}
