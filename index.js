import express from 'express';
import Handlebars from 'handlebars';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

const app = express();
const porta = 6000;

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

//CONFIGURAÇÃO DA PASTA ESTATICA
const __filename = fileURLToPath(import.meta.url); // Obtem o nome do arquivo atual
const __dirname = path.dirname(__filename); // Obtem o diretorio do arquivo atual

/*CONFIGURAÇÃO DA VISÃO*/ // Define o layout padrão para todas as páginas
app.engine('handlebars',handlebars.engine({
    defaultLayout: 'principal', 
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));


/*ROTAS DO SISTEMA*/

//Rota vai ser a tela de login
app.get('/', function(req, res){
    res.render('admin/index');
})

import projeto from './routes/projeto.js';
app.use('/projeto', projeto)

import comentario from './routes/comentario.js';
app.use('/comentario', comentario)

import sequelize from "./config/banco.js"; // Importa a configuração do banco
import "./models/Projeto.js";
import "./models/Tarefa.js";
import "./models/Comentario.js";

sequelize.sync({ alter: true }).then(() => {
    console.log("Banco de dados sincronizado!");
});


app.listen(porta, function(){
    console.log('Servidor rodando em http://localhost:' + porta);
});
