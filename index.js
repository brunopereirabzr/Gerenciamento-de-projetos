import express from 'express';
import Handlebars from 'handlebars';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';

const app = express();
const porta = 8000;

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

//Rota inicio
app.get('/', function(req, res){
    res.render('admin/index');
})

import projeto from './routes/projeto.js';
app.use('/projeto', projeto)

app.listen(porta, function(){
    console.log('Servidor rodando em http://localhost:' + porta);
});