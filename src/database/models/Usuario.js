const config = require("../config/config")

module.exports =(sequelize, DataTypes)=>{
    const alias = 'Usuario'
    const cols ={
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:DataTypes.STRING(100),
            allowNull:false,
        },
        admin:{
            type:DataTypes.tinyint(1),

        },
        correo:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique: true,       
        },
        FechaNac:{
            type:DataTypes.DATE,
            allowNull:false,


        },
        password:{
            allowNull:false,
            type:DataTypes.STRING(45),
        },
        roles_id:{
            type:DataTypes.INTEGER,

        }


    }

    const config={
        tableName:'usuarios',
    }

    const Ususario= sequelize.define(alias,cols, config)
    return Ususario
}