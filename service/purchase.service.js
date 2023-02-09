import axios from "axios";
import FormData from "form-data";
import { Purchase } from "../model/purchase.model.js";

export async function createPurchase(purchase) {
    var bodyFormData = new FormData();
    bodyFormData.append('amount', purchase.offer_price);
    bodyFormData.append('receipt_id', 86765674654654);
    bodyFormData.append('callback', '/');

    const response = await axios.post('http://localhost:8000/transaction/', bodyFormData, {
        headers: { "Content-Type": "multipart/form-data" }
    })
    console.log(response.data)
    const time = response.data.time_create
    const create = await Purchase.create({
        ...purchase, transaction_id: response.data.id,
        transaction_result: response.data.result
    })

    return create
}

export async function updateTransactionResult(data) {
    const { transaction_id, result } = data
    const purchase = await Purchase.findByPk(transaction_id)
    const updated = await purchase.update('result', result)

    return updated

}