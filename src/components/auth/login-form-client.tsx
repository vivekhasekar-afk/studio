"use client";

import { useEffect, useState } from "react";
import { LoginForm } from "./login-form";
import { Skeleton } from "../ui/skeleton";

export function LoginFormClient() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
  }

  return <LoginForm />;
}
