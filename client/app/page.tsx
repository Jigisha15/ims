"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/register"); // client-side redirect
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-gray-50 dark:bg-black sm:items-start">
        <Toaster />
      </main>
    </div>
  );
}
