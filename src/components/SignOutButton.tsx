"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
      className="text-sm text-red-500 hover:text-red-700 font-medium transition"
    >
      Sign out
    </button>
  );
}