
-- TABLA USUARIOS

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user', -- Vital para el panel de admin
    categoria_favorita VARCHAR(100),
    region VARCHAR(100),
    ciudad VARCHAR(100),
    direccion VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABLA PRODUCTOS

CREATE TABLE productos (
  id TEXT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  img TEXT NOT NULL,
  descripcion TEXT,
  detail TEXT[],
  precio INTEGER NOT NULL,
  categoria VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);


--TABLA CHECKOUTS


CREATE TABLE checkouts (
  id SERIAL PRIMARY KEY, 
  user_id TEXT NOT NULL,
  total INTEGER NOT NULL,
  estado VARCHAR(20) DEFAULT 'Pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);

--TABLA CHECKOUT_ITEM
CREATE TABLE checkout_items (
  id SERIAL PRIMARY KEY,
  checkout_id INTEGER NOT NULL REFERENCES checkouts(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price INTEGER NOT NULL,
  subtotal INTEGER NOT NULL
);

--TABLA CART_ITEMS
CREATE TABLE IF NOT EXISTS cart_items (
  id SERIAL PRIMARY KEY,
  user_email TEXT NOT NULL,
  product_id TEXT NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  img TEXT,
  quantity INTEGER NOT NULL
);