import banco from '../config/banco.js'

const Projeto = banco.sequelize.define('projetos', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: banco.Sequelize.STRING,
    },
    descricao:{
        type: banco.Sequelize.STRING,
    },
    prazo:{
        type: banco.Sequelize.INTEGER,
    },
    status:{
        type: banco.Sequelize.INTEGER,
    }
})
Projeto.sync()
export default Projeto