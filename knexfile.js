// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.sqlite3'
    },
    useNullAsDefault: true,
    migrations: './data/migrations',
    tableName: 'dbmigrations'
  },
  seeds: { directory: './data/seeds' }
};
