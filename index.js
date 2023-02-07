import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js';
import { createOffer, getOffer } from './service/offer.service.js';
import { getAircraftType } from './service/aircraft_type.service.js';
dotenv.config()

// import { getTasks, createTask, updateTask, deleteTask } from './controller/ticket.js';

const app = express(); 
const port = process.env.PORT || 3000;

// app.get('/api/tasks', (req, res) => {
//     getTasks().then(data => res.json(data));
// });

// app.post('/api/task', (req, res) => {
//     console.log(req.body);
//     createTask(req.body.task).then(data => res.json(data));
// });
 
// app.put('/api/task', (req, res) => {
//     updateTask(req.body.task).then(data => res.json(data));
// });

// app.delete('/api/task/:id', (req, res) => {
//     deleteTask(req.params.id).then(data => res.json(data));
// });

app.get('/create', async (req, res) => {
    res.send( await createOffer({}))
});
app.get('/get', async (req, res) => {
    res.send( await getAircraftType())
});




app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

function init() {
    connectDB()
}

init()