import { Pool, PoolClient } from 'pg'; // Importe o Pool e PoolClient
import config from '../../config';

export default async (): Promise<PoolClient> => {
  const pool = new Pool({
    connectionString: config.databaseURL,
  });

  try {
    const client = await pool.connect();
    console.log('Conectado ao PostgreSQL');
    return client; // Retorna o cliente do pool
  } catch (error) {
    console.error('Erro ao conectar ao PostgreSQL:', error);
    throw error;
  }
};
