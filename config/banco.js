import { Sequelize } from "sequelize"; 

const NOME_BANCO = 'projetos';
const USUARIO = 'root';
const SENHA = '';
const HOST = 'localhost';

// Configurando a instância de Sequelize com as credenciais e o banco de dados
const sequelize = new Sequelize(NOME_BANCO, USUARIO, SENHA, {
    host: HOST,
    dialect: 'mysql',
    logging: false  // Se você não quiser logs das queries SQL no console
});

// Testando a conexão com o banco de dados
sequelize.authenticate()
    .then(() => {
        console.log('Conexão realizada com sucesso!');
    })
    .catch((erro) => {
        console.error('Erro na conexão com o banco de dados:', erro);
    });

export default sequelize;  // Exportando apenas a instância do Sequelize
