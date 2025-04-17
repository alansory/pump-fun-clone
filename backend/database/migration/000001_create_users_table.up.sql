CREATE TABLE users (
  id bigserial PRIMARY KEY,
  name varchar(255) NOT NULL,
  address varchar(255) UNIQUE,
  email varchar(255) UNIQUE,
  password varchar NOT NULL,
  email_verified_at timestamp NULL,
  profile_photo_path varchar(255) NULL,
  otp varchar(255) NULL,
  otp_expires_at timestamp NULL,
  active boolean DEFAULT true,
  banned boolean DEFAULT false,
  remember_token varchar(100) NULL,
  created_at timestamp DEFAULT current_timestamp,
  updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE password_reset_tokens (
  email varchar(255) PRIMARY KEY,
  token varchar(255) NOT NULL,
  created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE sessions (
  id varchar(255) PRIMARY KEY,
  user_id bigserial REFERENCES users(id) ON DELETE SET NULL,
  ip_address varchar(45),
  user_agent text,
  payload text NOT NULL,
  last_activity timestamp NOT NULL
);