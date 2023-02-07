import { db } from "./db.config.js"
import readline from 'readline'
import fs from 'fs'

async function processLineByLine(filePath, tableName) {
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
        const query = `
        INSERT INTO ${tableName}(${columnNames}) VALUES (${values.join(',')});`
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
            path: 'C:\\Users\\ASUS\\Desktop\\sharif\\web\\hw2\\TicketDatabase\\aircraft_type.csv',
            name: 'aircraft_type'
        },
        {
            path: 'C:\\Users\\ASUS\\Desktop\\sharif\\web\\hw2\\TicketDatabase\\aircraft_layout.csv',
            name: 'aircraft_layout'
        },
        {
            path: 'C:\\Users\\ASUS\\Desktop\\sharif\\web\\hw2\\TicketDatabase\\aircraft.csv',
            name: 'aircraft'
        },
        {
            path: 'C:\\Users\\ASUS\\Desktop\\sharif\\web\\hw2\\TicketDatabase\\country.csv',
            name: 'country'
        },
        {
            path: 'C:\\Users\\ASUS\\Desktop\\sharif\\web\\hw2\\TicketDatabase\\city.csv',
            name: 'city'
        },
    ]
    for (const data of datas) {
        await processLineByLine(data.path, data.name)
    }
}

async function exec(query) {
    await db.query(query)
}