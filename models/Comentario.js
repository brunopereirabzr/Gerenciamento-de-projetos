import { DataTypes } from "sequelize";
import sequelize from "../config/banco.js"; 
import Projeto from "./Projeto.js"; 

const Comentario = sequelize.define("Comentario", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    projetoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Projeto, 
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    tableName: "comentarios",
    timestamps: true
});

// Relacionamento entre Projetos e comentario
Projeto.hasMany(Comentario, { foreignKey: "projetoId" });
Comentario.belongsTo(Projeto, { foreignKey: "projetoId" });

export default Comentario;
