"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/hooks/use-auth";
import { Spinner } from "@/components/ui/spinner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { data: user, isLoading, isError, isFetched } = useCurrentUser();

  useEffect(() => {
    if (!isFetched || isLoading) return;

    // console.log("Auth callback:", {
    //   user,
    //   isError,
    //   isFetched,
    // });

    if (user) {
      router.replace("/dashboard");
      return;
    }

    if (isError) {
      router.replace("/login?error=session");
      return;
    }
    
  }, [user, isLoading, isFetched, isError, router]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3">
      <Spinner className="size-6" />
      <p className="text-sm text-muted-foreground">Finishing GitHub sign-in…</p>
    </div>
  );
}