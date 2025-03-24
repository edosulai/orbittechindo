"use client";

import { Footer, SignupForm } from "@/components";
import { useProtectedRoute } from "@/hooks";
import Link from "next/link";

function SignupPage() {
  const { isAuthenticated, authIsLoading } = useProtectedRoute();

  if (!authIsLoading && isAuthenticated) {
    window.location.replace("/");
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-4 sm:p-8 md:p-12 lg:p-16 xl:p-20 gap-8 sm:gap-16">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl sm:text-3xl font-bold">Sign Up</h1>
        <SignupForm />
        <Link href={'/login'} className="text-md text-center font-semibold mx-auto">Login</Link>
      </main>
      <Footer />
    </div>
  );
}

export default SignupPage;
