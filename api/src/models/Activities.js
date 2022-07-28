const { DataTypes } = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('activites',{
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dificultad: {
            type: DataTypes.ENUM('1','2','3','4','5'),
            allowNull: false,
        },
        duracion:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        temporada: {
            type: DataTypes.ENUM('Verano', 'Otoño', 'Invierno', 'Primavera'),
            allowNull: false,
        }
        },{
            timestamps: false,
        });
}

// ID
// Nombre
// Dificultad (Entre 1 y 5)
// Duración
// Temporada (Verano, Otoño, Invierno o Primavera)