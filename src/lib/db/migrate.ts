import { execSync } from "child_process";
import path from "path";

export function runMigrations() {
  const migrationFile = path.resolve(__dirname, "migrations", "001-init.sql");
  try {
    // Run the migration SQL file using psql CLI
    execSync(`psql ${process.env.DATABASE_URL} -f ${migrationFile}`, { stdio: "inherit" });
    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Database migration failed:", error);
    throw error;
  }
}
