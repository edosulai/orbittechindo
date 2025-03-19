"use client";

import { AuthHeader } from "@/components";

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AuthHeader />
      <main>{children}</main>
    </div>
  );
}
