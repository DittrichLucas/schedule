const { Pool } = require('pg')
const { any } = require('bluebird')

const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.119',
  database: 'postgres',
  password: '123456',
  port: 5432,
})

const createtable = `
	-- tabela de contatos
	CREATE TABLE agenda (
		id serial PRIMARY KEY,
		nome text NOT NULL,
		email text NOT NULL,
		user_id integer NOT NULL
	);

	-- tabela de usuários
	CREATE TABLE users (
		id serial PRIMARY KEY,
		nome text NOT NULL,
		email text NOT NULL,
		senha text NOT NULL
	);

	-- tabela de sessões
	CREATE TABLE session (
		token text PRIMARY KEY NOT NULL,
		user_id integer NOT NULL
	);
`
const init = any([pool.query('DROP TABLE agenda'), pool.query('DROP TABLE users'), pool.query('DROP TABLE session')])
	.catch(() => {}) // não precisa tratar erro
	.then(() => pool.query(createtable))
	.then(() => {
		console.log('Tabelas criadas com sucesso!')
	})
	.catch(err => {
		console.log(`Falha ao criar tabela: ${err.message}`)
	})

module.exports = { pool, init }
