CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  eth_address VARCHAR(42) NOT NULL,
  starknet_address VARCHAR(66) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_registered BOOLEAN DEFAULT false,
  UNIQUE(eth_address),
  UNIQUE(starknet_address)
);