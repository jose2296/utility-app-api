declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        MYSQL_DATABASE_URL: string;
        PORT: number;
        SALT_ROUNDS: number;
        JWT_SECRET: string;
    }
}