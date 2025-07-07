import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  githubId: text("github_id").notNull().default(""),
  email: text("email").notNull(),
  passwordHash: text("password_hash").default(""),
  name: text("name").default(""),
  avatarUrl: text("avatar_url").default(""),
  role: text("role").default("user"),
  isGuest: boolean("is_guest").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description").default(""),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  path: text("path").notNull(),
  content: text("content").default(""),
  language: text("language").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const graphNodes = pgTable("graph_nodes", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  label: text("label").notNull(),
  type: text("type").notNull(),
  content: text("content").default(""),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const graphEdges = pgTable("graph_edges", {
  id: serial("id").primaryKey(),
  fromNode: integer("from_node").notNull(),
  toNode: integer("to_node").notNull(),
  type: text("type").default(""),
  createdAt: timestamp("created_at").defaultNow(),
});
