"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
    return (
        <button
            onClick={() => signIn("google", {
                callbackUrl: "/dashboard",
                prompt: "select_account"
            })}

            className="flex items-center justify-center gap-3 w-full border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition font-medium"
        >
            <Image src="https://authjs.dev/img/providers/google.svg" alt="Google" width={20} height={20} />
            Continue with Google
        </button>
    );
}