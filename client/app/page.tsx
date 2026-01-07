"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { useMounted } from "@/lib/mount";

export default function Home() {
  const router = useRouter();
  //const { isAuthenticated } = useSelector((state: RootState) => state.auth)

  // route protection
  const mounted = useMounted();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const token = useSelector((s: RootState) => s.auth.token)

  useEffect(() => {
    if (!mounted) return;

    if (!isAuthenticated) {
      router.push("/auth/register");
    }
  }, [mounted, isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-32 px-16 bg-gray-50 dark:bg-black sm:items-start">
        <Toaster />
      </main>
    </div>
  );
}
