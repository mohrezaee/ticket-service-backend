import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js';
import { createOffer, getOffer } from './service/offer.service.js';
import { getAircraftType } from './service/aircraft_type.service.js';
import bodyParser from 'body-parser';
import { createPurchase } from './service/purchase.service.js';
dotenv.config()

const app = express(); 
const port = process.env.PORT || 3000;
app.use(bodyParser.json())
app.get('/create', async (req, res) => {
    res.send( await createOffer({}))
});
app.post('/offers', async (req, res) => {
    res.send( await getOffer(req.body))
});

app.post('/purchase', async (req, res) => {
    res.send(await createPurchase(req.body))
})

app.patch('/purchase/:id', async(req, res) => {
    
})

app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

function init() {
    connectDB()
}

init()