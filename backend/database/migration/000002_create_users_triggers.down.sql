-- Drop trigger for `users` table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;

-- Drop trigger function to update `updated_at` column
DROP FUNCTION IF EXISTS update_updated_at_column;