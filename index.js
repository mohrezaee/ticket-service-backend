import express from 'express';
import dotenv from 'dotenv'
import { connectDB } from './config/db.config.js';
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

app.get('/', (req, res) => {
    res.send(`<h1>API Works !!!</h1>`)
});



app.listen(port, () => {
    console.log(`Server listening on the port  ${port}`);
})

function init() {
    connectDB()
}

init()