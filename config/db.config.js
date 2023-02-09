import { Sequelize } from 'sequelize'
import { importData } from './DataInit.js';
export const db = new Sequelize('postgres', 'test', '1234', {
    host: 'localhost',  
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0, 
        acquire: 30000,  
        idle: 10000 
    }
});



export async function connectDB() {
    try {
        await db.authenticate()
        await importData()
    } catch (error) { 
        console.error(error)
        process.exit(1)
    }
}
