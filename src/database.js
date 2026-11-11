import mysql from 'mysql2';

let connection;

export const db = {
    connect: () => new Promise((resolve, reject) => {
        connection = mysql.createConnection({
            ...(process.env.DB_SOCKET
                ? { socketPath: process.env.DB_SOCKET }
                : { host: process.env.DB_HOST || '127.0.0.1' }),
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        });
        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }),
    query: (queryString, escapedValues) =>
        new Promise((resolve, reject) => {
            connection.query(queryString, escapedValues, (error, results, fields) => {
                if (error) reject(error);
                resolve({ results, fields});
            })
        }),
    end: () => connection.end()
}