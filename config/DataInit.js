import { db } from "./db.config.js"
import readline from 'readline'
import fs from 'fs'

async function processLineByLine(filePath, tableName) {
    const countQuery = `SELECT COUNT(*) FROM ${tableName};`
    try {
        let response = await exec(countQuery)
        if (response[0][0].count > 0) {
            return
        }
        
        
    } catch (error) {

    }
    
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let count = 0
    let columnNames = []
    for await (const line of rl) {
        if (count === 0) {
            columnNames = line
            count++
            continue
        }
        if ((line.match(/,/g) || []).length > columnNames.length - 1) {
            continue
        }
        let newline = line.split(',')
        let values = []
        for (let value of newline) {
            value = value.replace(`'`, `\'`)
            values.push(!Number.isInteger(value) ? `'${value}'` : value)
        }
        const query = `INSERT INTO ${tableName}(${columnNames}) VALUES (${values.join(',')});`
        try {
            await exec(query)
        } catch (error) {
 
        }
    }
}
const createTablesQuery = fs.readFileSync('config/ticket.sql').toString()

export async function importData() {
    await exec(createTablesQuery)
    const datas = [
        {
            path: '..\\TicketDatabase\\aircraft.csv',
            name: 'aircraft'
        },
        {
            path: '..\\TicketDatabase\\aircraft_layout.csv',
            name: 'aircraft_layout'
        },
        {
            path: '..\\TicketDatabase\\aircraft_type.csv',
            name: 'aircraft_type'
        },
        {
            path: '..\\TicketDatabase\\airport.csv',
            name: 'airport'
        },
        {
            path: '..\\TicketDatabase\\country.csv',
            name: 'country'
        },
        {
            path: '..\\TicketDatabase\\city.csv',
            name: 'city'
        },
        {
            path: '..\\TicketDatabase\\flight.csv',
            name: 'flight'
        },
    ]
    for (const data of datas) {
        // TODO check https://stackoverflow.com/questions/52734080/how-to-insert-bulk-data-to-postgresql-db-from-csv-file
        await processLineByLine(data.path, data.name)
    }
}

async function exec(query) {
    return await db.query(query)
}