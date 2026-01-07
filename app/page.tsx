import "./globals.css";

import ContentWrapper from "@/components/ContentWrapper";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16  sm:items-start">
        <ContentWrapper />
      </main>
    </div>
  );
}
