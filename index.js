const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/*
Verbos http
GET - obtener recursos
POST - Almacenar recursos
PATCH - Modificar un recurso completo
PUT - Modificar una part de un recurso
DELETE -Borrar un recursos
*/

app.get("/", (req, res, next) => {
   return res.status(200).send("Bienvenido al Pokedex"); 
});

app.use("/pokemon", pokemon);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is runnig...")
});