const { Router } = require('express');

//instalamos axios 
const axios = require("axios");

//mis tablas de la db
const { Country, Activity } = require("../db.js");

const { Op } = require("sequelize");



// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



//[ ] GET /countries:
// En una primera instancia deberán traer todos los países desde restcountries y guardarlos en su propia base de datos y luego ya utilizarlos desde allí (Debe retonar sólo los datos necesarios para la ruta principal)
// Obtener un listado de los paises.


router.get("/countries", async (req, res) => {
    try {
        //{ inclde: [{ model: Activity}]} poner adentro del findAll
        const paisesDB = await Country.findAll()
        let aux = paisesDB.map((pais) => {
            const obj = {
                id: pais.id,
                img: pais.img,
                name: pais.name,
                continente: pais.region
            }
            return obj;
        })
    res.json(aux)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

    // const name = req.query.name
    // const apiCountries = await data()

    // try {
    //     let hay = await Country.findAll();
    //     if(!hay.length) await Country.bulkCreate(apiCountries)
    //     res.json(Country)

    // } catch (error) {
    //     console.log(error);
    // }

    // if (name){
    //     try {
    //         let char = await Country.findAll({
    //             where: {
    //                 name: {
    //                     [Op.iLike]: '%' + name + '%'
    //                 }
    //             }
    //         })
    //         return res.json(char)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // } else if (req.query.filter){
    //     try {
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

})



// GET /countries/{idPais}:
// Obtener el detalle de un país en particular
// Debe traer solo los datos pedidos en la ruta de detalle de país
// Incluir los datos de las actividades turísticas correspondientes
router.get("/countries/:idPais", async (req, res) => {
    const {idPais} = req.params
    if(!idPais) res.status(400).json({msg: "Missing ID"})
    try {
        const pais = await Country.findByPk(idPais,{include: [{model: Activity}]})
        res.json(pais || 'pais no encontrado')
    } catch (error) {
        console.log(error);
    }
})



// [ ] GET /countries?name="...":
// Obtener los países que coincidan con el nombre pasado como query parameter (No necesariamente tiene que ser una matcheo exacto)
// Si no existe ningún país mostrar un mensaje adecuado
router.get("/countries/:name",(req, res) => {

})



// [ ] POST /activities:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
// Crea una actividad turística en la base de datos, relacionada con los países correspondientes

router.post("/activities", async (req, res) => {
    const { nombre, dificultad, duracion, temporada, idPais } = req.body
    if(!nombre || !dificultad || !duracion || !temporada || !idPais) 
        res.status(400).json("faltan datos")
    try {
        const newActivity = await Activity.create({ 
            nombre, 
            dificultad, 
            duracion, 
            temporada
        })
        const agregarCountry = await Country.findOne({
            where: {
                id: idPais,
            }
        })
        await newActivity.addCountry(agregarCountry)
        res.sendStatus(201)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})




module.exports = router;
