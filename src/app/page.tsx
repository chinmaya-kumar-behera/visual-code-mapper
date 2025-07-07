"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { LoginUI } from "../components/LoginUI";
import CodeUpload from "./components/CodeUpload";

export default function Page() {
  const { data: session } = useSession();
  const [parsedData, setParsedData] = useState(null);

  const handleProcess = (data: any) => {
    setParsedData(data);
  };

  const handleLoginClick = () => {
    signIn();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-8 space-y-8">
      <LoginUI session={session} />
      <CodeUpload
        onProcess={handleProcess}
        isLoggedIn={!!session}
        onLoginClick={handleLoginClick}
      />
      {parsedData && (
        <div className="w-full max-w-4xl border p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Parsed Code Data</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
