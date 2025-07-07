// app/page.tsx
import { auth } from "@/lib/auth";
import { LoginUI } from "@/components/LoginUI";

export default async function Home() {
  const session = await auth();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Visual Code Mapper</h1>
      <LoginUI session={session} />
    </main>
  );
}
