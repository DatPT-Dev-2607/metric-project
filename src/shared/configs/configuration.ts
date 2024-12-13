export default (): any => ({
  env: process.env.APP_ENVIRONMENT,
  port: process.env.APP_PORT || 4000,
  url: process.env.APP_URL,
  database: {
    host: process.env.USER_DB_HOST,
    user: process.env.USER_DB_USER,
    password: process.env.USER_DB_PASSWORD,
    name: process.env.USER_DB_NAME,
    port: process.env.USER_DB_PORT,
  },
});
