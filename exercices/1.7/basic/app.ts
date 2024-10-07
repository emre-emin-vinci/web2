import express from "express";

import usersRouter from "./routes/users";
import filmRouter from "./routes/films";

const app = express();
let slashCounter = 0;
let getPizzaCounter = 0;
let postPizzaCounter = 0;
let deletePizzaCounter = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/films", filmRouter);
app.use((_req, _res) => {
    if (_req.method === 'GET' && _req.url === '/') {
        slashCounter++;
    }
    if (_req.method === 'GET' && _req.url === '/pizza') {
        getPizzaCounter++;
    }
    if (_req.method === 'POST' && _req.url === '/pizza') {
        postPizzaCounter++;
    }
    if (_req.method === 'DELETE' && _req.url === '/pizza') {
        deletePizzaCounter++;
    }

    console.log('Nombre de requêtes : '
        + 'GET / ' + slashCounter + ', '
        + 'GET /pizza ' + getPizzaCounter + ', '
        + 'POST /pizza ' + postPizzaCounter + ', '
        + 'DELETE /pizza ' + deletePizzaCounter
    );
});
    

export default app;
