import sequelize from '../config/banco.js';

const Projeto = sequelize.define('projetos', {
    id: {
        type: sequelize.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: sequelize.Sequelize.STRING,
    },
    descricao: {
        type: sequelize.Sequelize.STRING, 
    },
    prazo: {
        type: sequelize.Sequelize.INTEGER,
    },
    status: {
        type: sequelize.Sequelize.INTEGER,
    },
});

Projeto.sync(); 
export default Projeto;
