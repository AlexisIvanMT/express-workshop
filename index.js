const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon }= require('./pokedex.json');

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
   return res.status(200).send("Bienvenido al Pokemon"); 
});

app.post("/pokemon", (req,res, next) => {
    return res.status(200).send(req.body.name);
});

//Para extraer solo los datos necesarios
app.get('/:pokemon',(req, res, next) => {
    return res.status(200).send(pokemon);
});

//Para obtener un pokemon por id 
app.get('/pokemon/:id([0-9]{1,3})',(req, res, next) => {
    const id = req.params.id - 1;
    //condicion ? valor si verdadero : valor si es falso
    (id >= 0 && id <= 150) ? res.status(200).send(pokemon[req.params.id - 1]) : res.status(404).send("Pokémon no encontrado");
});

//([A-Za-z]+) recibe peticiones que se encuzntren dentro de un abcdario
app.get('/pokemon/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;
    /*
    for(i = 0; i < pokemon.length; i++) {
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            res.status(200).send(pokemon[i])
        }
    }*/
    
    //pk es un arreglo
    const pk = pokemon.filter((p) => {

        //condicion ? valor si verdadero : valor si es falso, toma dos valores verdaderos y regresa p
      return (p.name.toUpperCase() == name.toUpperCase()) && p;
        
        
    });
    
    
    //condicion ? valor si verdadero : valor si es falso
    (pk.length > 0) ? res.status(200).send(pk) : res.status(404).send("Pokémon no encontrado");

});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is runnig...")
});