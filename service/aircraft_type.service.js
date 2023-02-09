import { AircraftType } from "../model/aircraft_type.model.js";


export async function createAircraftType(data) {
    const aircraft = new AircraftType(data)
    return await aircraft.save()
}

export async function getAircraftType() {
    const response = await AircraftType.findAll()
    return response
}