const express= require('express');
const pokemon = express.Router();
const db = require('../config/database')

//const pk = require('../pokedex.json').pokemon;
//quitamos la llaves no hay varible llamada pk en el json, al final agregamos .pokemon

pokemon.post("/", (req, res, next) => {
    return res.status(200).send(req.body);
});

//Para extraer solo los datos necesarios
pokemon.get('/',async (req, res, next) => {
    const pkmn =await db.query("SELECT * FROM pokemon");
    
    return res.status(200).json(pkmn);
});

//Para obtener un pokemon por id 
pokemon.get('/:id([0-9]{1,3})',(req, res, next) => {
    const id = req.params.id - 1;
    //condicion ? valor si verdadero : valor si es falso
    
    if (id >= 0 && id <= 150) {
       
       return res.status(200).send(pk[req.params.id - 1])
       console.log(pk);
    }  
       return res.status(404).send("Pokémon no encontrado"); 
});

//([A-Za-z]+) recibe peticiones que se encuzntren dentro de un abcdario
pokemon.get('/:name([A-Za-z]+)', (req, res, next) => {
    const name = req.params.name;
    /*
    for(i = 0; i < pokemon.length; i++) {
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            res.status(200).send(pokemon[i])
        }
    }*/
    
    //pk es un arreglo
    const pkmn = pk.filter((p) => {

        //condicion ? valor si verdadero : valor si es falso, toma dos valores verdaderos y regresa p
      return (p.name.toUpperCase() == name.toUpperCase()) && p;
        
        
    });
    
    
    //condicion ? valor si verdadero : valor si es falso
    (pkmn.length > 0) ? res.status(200).send(pkmn) : res.status(404).send("Pokémon no encontrado");

});

module.exports = pokemon;