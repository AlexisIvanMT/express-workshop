const express = require('express');
const app = express();
const { pokemon }= require('./pokedex.json');
/*
Verbos http
GET
POST
PATCH
PUT 
DELETE
*/

app.get("/", (req, res, next) => {
    res.status(200);
    res.send("Bienvenido al Pokemon"); 
});
//Para extraer solo los datos necesarios
app.get("/:pokemon/all",(req, res, next) => {
    res.status(200);
    res.send(pokemon);
});
//Para obtener un pokemon por id 
app.get("/pokemon/:id([0-9]{1,3})",(req, res, next) => {
    const id= req.params.id - 1;
    if(id >= 0 && id <= 150){
        res.status(200);
        res.send(pokemon[req.params.id-1]);
    }else{
        res.status(404);
        res.send("Pokémon no encontrado");
    }
    
});

app.get('/pokemon/:name', (req, res,next) => {
    const name = req.params.name;
    for(i=0;i<pokemon.length;i++){
        if(pokemon[i].name == name){
            res.status(200);
            res.send(pokemon[i])
        }
    }

});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is runnig...")
});