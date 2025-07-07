// components/LoginUI.tsx
"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export function LoginUI({ session }: { session: any }) {
  const handleSignIn = async (provider: string) => {
    const result = await signIn(provider, { redirect: false });
    if (result?.ok && result?.url) {
      // Save token from cookies or session to localStorage/sessionStorage if needed
      // Here we just redirect to the URL
      window.location.href = result.url;
    }
  };

  return session ? (
    <div>
      <p>Welcome, {session.user?.email}!</p>
      <button
        onClick={() => signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Log out
      </button>
    </div>
  ) : (
    <div className="space-y-4">
      <button
        onClick={() => handleSignIn("github")}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded"
      >
        Login with GitHub
      </button>
      <button
        onClick={() => handleSignIn("credentials")}
        className="w-full px-4 py-2 bg-green-600 text-white rounded"
      >
        Login with Email
      </button>
      <p className="mt-2 text-center">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
