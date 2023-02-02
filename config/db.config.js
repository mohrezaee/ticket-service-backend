import pg from 'pg'
import fs from 'fs'
 
var sql = fs.readFileSync('config/ticket.sql').toString()
export async function connectDB() {
    const client = new pg.Pool({
        host: '127.0.0.1',
        user: 'postgres',
        database: 'postgres',
        password: 'Mm.465276802',
        port: 5432,
    });
    try {
        await client.connect()
        await client.query(sql)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}
