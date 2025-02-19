import { DataTypes } from 'sequelize';
import sequelize from '../config/banco.js';
import Projeto from './Projeto.js'

const Arquivo = sequelize.define('Arquivo', {
    id: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caminho: {
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
    tableName: "arquivos",
    timestamps: true
});

Projeto.hasMany(Arquivo, { foreignKey: "projetoId" });
Arquivo.belongsTo(Projeto, { foreignKey: "projetoId" });

Arquivo.sync(); 
export default Arquivo;
