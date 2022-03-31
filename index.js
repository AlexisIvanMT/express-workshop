//Dependencies
//const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routers
const user = require('./routes/user');
const pokemon = require('./routes/pokemon');
//middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notfound');
const index = require('./middleware/index');
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

app.get("/",index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is runnig...")
});