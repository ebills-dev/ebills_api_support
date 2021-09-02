import express from 'express';
import cors from 'cors';
import db from './database.js';
// IMPORTING ALL THE ENDPOINTS TO HANDLE REQS
import {
	handling_id_req, sendingWorkList, saving_form_data, saving_new_work
} from './imports.js';

// ! password support server
const base_url = "http://pwgs.herokuapp.com";
// const base_url = "http://localhost:3003";

const app = express();
//! needed to manage req.  .express.json() => to access to the req's body
//! cors() => security stuff
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.json("You're welcome"));
app.get('/bill_id', handling_id_req(db));
app.get('/works_list', sendingWorkList(db));
app.post('/saving', saving_form_data(db, base_url));
app.post('/adding_w', saving_new_work(db, base_url));


const PORT = process.env.PORT;
// const PORT = 3000;
app.listen(PORT || 3000, () => {
	console.log(`Server RDY. Listeting to ${PORT}`)
});
