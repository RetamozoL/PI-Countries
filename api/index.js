//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const axios = require('axios')
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');

async function cargarBD(){
  try {
    const paises = Country.findAll();
    if(!paises.length){
    const api = await axios.get("https://restcountries.com/v3/all");
    
    let formatear = api.data.map(pais => {
        const name = pais.name.common[0] === 'Å' ? pais.name.common.replace('Å','A') : pais.name.common
        return {
            id: pais.cca3,
            name,
            img: pais.flags[0],
            region: pais.continents[0],
            capital: pais.capital ? pais.capital[0] : "Not Found",
            subregion: pais.subregion,
            area: pais.area,
            population: pais.population,
        };
    });
    // const db = await Country.findAll({include: [{ model:Activity }] });
    // const suma = [...formatear, ...db];
    await Country.bulkCreate(formatear)
    console.log("db creada")
  }
  } catch (error) {
    console.log(error);
  }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {
  await cargarBD()
  server.listen($PORT, async () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
