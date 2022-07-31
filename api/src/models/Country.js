const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
//  [ ] País con las siguientes propiedades:
    // ID (Código de 3 letras) *
    id:{
      type: DataTypes.STRING(3),
      unique:true,
      allowNull: false,
      primaryKey: true,
    },
    // Nombre *
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Imagen de la bandera *
    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Continente *
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
      // Capital *
    capital:{
      type: DataTypes.STRING,
      allowNull: false,
    },
      // Subregión
    subregion:{
      type: DataTypes.STRING,
    },
    // Área
    area:{
      type: DataTypes.INTEGER,
    },
      // Población
    population:{
      type: DataTypes.INTEGER,
    },},
    {
      timestamps:false,
    });
};
