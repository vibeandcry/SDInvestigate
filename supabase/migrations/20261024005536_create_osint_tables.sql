/*
# Create OSINT tool directory tables

Creates the core tables for the S&D Intel Investigator OSINT tool directory app.

1. New Tables
- `categories` — OSINT tool categories (Social Media, Network Analysis, etc.)
  - id (serial PK), name, slug (unique), description, icon, color
- `tools` — Individual OSINT tools belonging to categories
  - id (serial PK), name, description, full_description, url, category_id (FK)
  - pricing (free/freemium/premium/trial/subscription), platform, rating, user_count
  - features (text[]), use_cases (jsonb), tags (text[])
  - is_verified, last_updated, is_official, has_api
  - icon_type, icon_name, icon_color
- `favorites` — User favorites (session-based, no auth)
  - id (serial PK), tool_id (FK), user_id (text session ID)
- `user_onboarding` — Tracks onboarding progress per session
  - id (serial PK), user_id (unique), boolean flags for each onboarding step

2. Security
- RLS enabled on all tables.
- This is a no-sign-in public directory app — all data is intentionally shared.
- Policies use `TO anon, authenticated` so the anon-key frontend can read/write.
- Favorites and onboarding are session-scoped (user_id is a session string, not auth.uid).
- service_role granted for edge function access if needed later.

3. Notes
- Serial columns need sequence grants for anon/authenticated to support INSERT.
- use_cases stored as jsonb array of {title, description, color} objects.
*/

CREATE TABLE IF NOT EXISTS categories (
  id serial PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL
);

CREATE TABLE IF NOT EXISTS tools (
  id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  full_description text,
  url text NOT NULL,
  category_id integer NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  pricing text NOT NULL DEFAULT 'free',
  platform text NOT NULL DEFAULT 'web',
  rating integer NOT NULL DEFAULT 40,
  user_count integer NOT NULL DEFAULT 0,
  features text[] NOT NULL DEFAULT '{}',
  use_cases jsonb NOT NULL DEFAULT '[]'::jsonb,
  tags text[] NOT NULL DEFAULT '{}',
  is_verified boolean NOT NULL DEFAULT true,
  last_updated text NOT NULL DEFAULT '',
  is_official boolean NOT NULL DEFAULT false,
  has_api boolean NOT NULL DEFAULT false,
  icon_type text NOT NULL DEFAULT 'fas',
  icon_name text NOT NULL DEFAULT 'fa-search',
  icon_color text NOT NULL DEFAULT 'blue'
);

CREATE TABLE IF NOT EXISTS favorites (
  id serial PRIMARY KEY,
  tool_id integer NOT NULL REFERENCES tools(id) ON DELETE CASCADE,
  user_id text NOT NULL
);

CREATE TABLE IF NOT EXISTS user_onboarding (
  id serial PRIMARY KEY,
  user_id text NOT NULL UNIQUE,
  has_seen_welcome boolean NOT NULL DEFAULT false,
  has_seen_category_filter boolean NOT NULL DEFAULT false,
  has_seen_search boolean NOT NULL DEFAULT false,
  has_seen_tool_card boolean NOT NULL DEFAULT false,
  has_seen_export boolean NOT NULL DEFAULT false,
  has_seen_report boolean NOT NULL DEFAULT false,
  completed_onboarding boolean NOT NULL DEFAULT false
);

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_onboarding ENABLE ROW LEVEL SECURITY;

-- Grants: anon + authenticated for this no-auth public directory app
GRANT SELECT, INSERT, UPDATE, DELETE ON categories TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON tools TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON favorites TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON user_onboarding TO anon, authenticated;
GRANT USAGE ON SEQUENCE categories_id_seq TO anon, authenticated;
GRANT USAGE ON SEQUENCE tools_id_seq TO anon, authenticated;
GRANT USAGE ON SEQUENCE favorites_id_seq TO anon, authenticated;
GRANT USAGE ON SEQUENCE user_onboarding_id_seq TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Categories policies (public read, public write for admin purposes)
DROP POLICY IF EXISTS "anon_select_categories" ON categories;
CREATE POLICY "anon_select_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_categories" ON categories;
CREATE POLICY "anon_insert_categories" ON categories FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_categories" ON categories;
CREATE POLICY "anon_update_categories" ON categories FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_categories" ON categories;
CREATE POLICY "anon_delete_categories" ON categories FOR DELETE
  TO anon, authenticated USING (true);

-- Tools policies (public read/write — shared directory)
DROP POLICY IF EXISTS "anon_select_tools" ON tools;
CREATE POLICY "anon_select_tools" ON tools FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tools" ON tools;
CREATE POLICY "anon_insert_tools" ON tools FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tools" ON tools;
CREATE POLICY "anon_update_tools" ON tools FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tools" ON tools;
CREATE POLICY "anon_delete_tools" ON tools FOR DELETE
  TO anon, authenticated USING (true);

-- Favorites policies (session-scoped — user_id is a session string)
DROP POLICY IF EXISTS "anon_select_favorites" ON favorites;
CREATE POLICY "anon_select_favorites" ON favorites FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_favorites" ON favorites;
CREATE POLICY "anon_insert_favorites" ON favorites FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_favorites" ON favorites;
CREATE POLICY "anon_update_favorites" ON favorites FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_favorites" ON favorites;
CREATE POLICY "anon_delete_favorites" ON favorites FOR DELETE
  TO anon, authenticated USING (true);

-- Onboarding policies (session-scoped)
DROP POLICY IF EXISTS "anon_select_onboarding" ON user_onboarding;
CREATE POLICY "anon_select_onboarding" ON user_onboarding FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_onboarding" ON user_onboarding;
CREATE POLICY "anon_insert_onboarding" ON user_onboarding FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_onboarding" ON user_onboarding;
CREATE POLICY "anon_update_onboarding" ON user_onboarding FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_onboarding" ON user_onboarding;
CREATE POLICY "anon_delete_onboarding" ON user_onboarding FOR DELETE
  TO anon, authenticated USING (true);
