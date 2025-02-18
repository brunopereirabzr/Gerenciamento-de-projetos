import { DataTypes } from "sequelize";
import sequelize from "../config/banco.js"; 
import Projeto from "./Projeto.js"; 

const Tarefa = sequelize.define("Tarefa", {
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
            model: Projeto, // Chave estrangeira associada ao projeto
            key: "id"
        },
        onDelete: "CASCADE"
    }
}, {
    tableName: "tarefas",
    timestamps: true
});

// Relacionamento entre Projetos e Tarefas
Projeto.hasMany(Tarefa, { foreignKey: "projetoId" });
Tarefa.belongsTo(Projeto, { foreignKey: "projetoId" });

export default Tarefa;
