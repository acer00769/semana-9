CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE schedules (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  available BOOLEAN DEFAULT true
);

CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  schedule_id INTEGER REFERENCES schedules(id),
  status VARCHAR(50)
);