import { Offer } from "../model/offer.model.js";


export async function createOffer(data) {
    const offer = new Offer(data)
    return await offer.save()
}

export async function getOffer() {
    const response = await Offer.findAll()
    console.log(response)
    return response
}