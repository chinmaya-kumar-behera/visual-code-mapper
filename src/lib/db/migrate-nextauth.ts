import { execSync } from "child_process";
import path from "path";

export function runNextAuthMigrations() {
  const migrationFile = path.resolve(__dirname, "migrations", "002-nextauth-tables.sql");
  try {
    execSync(`psql ${process.env.DATABASE_URL} -f ${migrationFile}`, { stdio: "inherit" });
    console.log("NextAuth tables migration completed successfully.");
  } catch (error) {
    console.error("NextAuth tables migration failed:", error);
    throw error;
  }
}
