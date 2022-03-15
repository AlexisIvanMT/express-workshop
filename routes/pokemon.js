const express= require('express');
const pokemon = express.Router();
const db = require('../config/database')

//const pk = require('../pokedex.json').pokemon;
//quitamos la llaves no hay varible llamada pk en el json, al final agregamos .pokemon

pokemon.post("/", async (req, res, next) => {
    const {pok_name,pok_height, pok_weight, pok_base_experience} = req.body;

    if(pok_name && pok_height && pok_weight && pok_base_experience)
    {
        let query ="INSERT INTO pokemon (pok_name, pok_height, pok_weight, pok_base_experience)";
        query += `VALUES ('${pok_name}', ${pok_height},${pok_weight},${pok_base_experience})`;
        
        const rows =await db.query(query);
        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message:"Pokemon insertado correctamente"});
        }

        return res.status(500).json({code: 500, message: "Ocurrio un error"});
   }
   return res.status(500).json({code: 500, message: "Campos incompletos"});
    
});

//Para extraer solo los datos necesarios
pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon"); 
    return res.status(200).json({code: 1, message: pkmn});
});

//Para obtener un pokemon por id 
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    //condicion ? valor si verdadero : valor si es falso
    
    if (id >= 1 && id <= 722) {
       const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id=" + id +";");
       return res.status(200).json({code:200, message: pkmn});
       
    }  
       return res.status(404).send({code:404, message:"Pokemon no encontrado"}); 
});

//([A-Za-z]+) recibe peticiones que se encuzntren dentro de un abcdario
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_name='"+ name + "';");
    /*
    for(i = 0; i < pokemon.length; i++) {
        if(pokemon[i].name.toUpperCase() == name.toUpperCase()){
            res.status(200).send(pokemon[i])
        }
    }*/
    
    //pk es un arreglo
    //const pkmn = pk.filter((p) => {
        
        //condicion ? valor si verdadero : valor si es falso, toma dos valores verdaderos y regresa p
      //return (p.name.toUpperCase() == name.toUpperCase()) && p;
        
        
   // });
    if(pkmn.length > 0) {
        return res.status(200).json({code:200, message: pkmn});
    }
    
    //condicion ? valor si verdadero : valor si es falso
    return res.status(404).send({code:404, message:"Pokemon no encontrado"}); 

});

module.exports = pokemon;