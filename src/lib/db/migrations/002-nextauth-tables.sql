-- Migration script to create next-auth required tables for Drizzle adapter

CREATE TABLE IF NOT EXISTS account (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  type VARCHAR(255) NOT NULL,
  provider VARCHAR(255) NOT NULL,
  provider_account_id VARCHAR(255) NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type VARCHAR(255),
  scope VARCHAR(255),
  id_token TEXT,
  session_state VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS session (
  id SERIAL PRIMARY KEY,
  session_token VARCHAR(255) NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id),
  expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_token (
  identifier VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires TIMESTAMP NOT NULL,
  PRIMARY KEY (identifier, token)
);
