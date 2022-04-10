const dotenv = require('dotenv').config({path: './config/.env'});
const express = require("express");
const cors = require("cors");

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());


// conecta as rotas
app.use('/api/', routes);


app.listen(process.env.APP_PORT, '0.0.0.0', function() {
    console.log("");
    console.log("**************************************************************************************************");
    console.log(`Servidor rodando na porta ${process.env.APP_PORT}...`);
    console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
    console.log("**************************************************************************************************");
    console.log("");
});

