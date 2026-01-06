"use client";
import Image from "next/image";
import { neon } from "@neondatabase/serverless";
import { NeonAuthUIProvider } from "@neondatabase/neon-js/auth/react";
import { authClient } from "../../lib/auth";

export default function Home() {
  return (
    <NeonAuthUIProvider emailOTP authClient={authClient}>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"></main>
      </div>
    </NeonAuthUIProvider>
  );
}
