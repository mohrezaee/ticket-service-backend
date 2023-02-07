import { Aircraft } from "../model/aircraft.model.js";


export async function createAircraft(data) {
    const aircraft = new Aircraft(data)
    return await aircraft.save()
}

export async function getAircraft() {
    const response = await Aircraft.findAll()
    console.log(response)
    return response
}