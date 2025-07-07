// users.ts
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  githubId: text("github_id").notNull(),
});

// projects.ts
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow(),
});

// files.ts
export const files = pgTable("files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  path: text("path"),
  content: text("content"),
});

// graph_nodes.ts
export const graphNodes = pgTable("graph_nodes", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id),
  label: text("label"),
  type: text("type"), // file, function, class
});

// graph_edges.ts
export const graphEdges = pgTable("graph_edges", {
  id: serial("id").primaryKey(),
  fromNode: integer("from_node"),
  toNode: integer("to_node"),
  type: text("type"), // call, import, etc
});
