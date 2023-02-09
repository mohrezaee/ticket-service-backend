import { Offer } from "../model/offer.model.js";


export async function createOffer(data) {
    const offer = new Offer(data)
    return await offer.save()
}

export async function getOffer(filter) {
    console.log(filter)
    let origin = filter.origin
    let destination = filter.destination
    let departure_local_time = filter.departure_local_time

    const response = await Offer.findAll({
        where: {
            origin,
            destination
        }
    });
    return response
}

function sameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
}