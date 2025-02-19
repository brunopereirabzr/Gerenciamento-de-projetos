import express from 'express';
import Handlebars from 'handlebars';
import handlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import "./models/Usuario.js";
import session from 'express-session';



const app = express();
const porta = 8000;
app.use(express.json());

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

//CONFIGURAÇÃO DA PASTA ESTATICA
const __filename = fileURLToPath(import.meta.url); // Obtem o nome do arquivo atual
const __dirname = path.dirname(__filename); // Obtem o diretorio do arquivo atual
app.set('views', path.join(__dirname, 'views'));


/*CONFIGURAÇÃO DA VISÃO*/ // Define o layout padrão para todas as páginas
app.engine('handlebars',handlebars.engine({
    defaultLayout: 'principal', 
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

// Configuração da sessão
app.use(session({
    secret: 'chave-secreta', // Uma chave secreta para assinar a sessão
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // false porque estamos em ambiente de desenvolvimento (sem HTTPS)
}));


// Lista de usuários simulada (substituir por banco de dados futuramente)
const usuarios = [
    { email: "admin@email.com", senha: "123456" }
];

/*ROTAS DO SISTEMA*/

//Rota vai ser a tela de login
app.get('/', function(req, res){
    res.render('admin/login');
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuarios.find(user => user.email === email && user.senha === senha);

    if (usuario) {
        req.session.usuario = usuario;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { erro: "E-mail ou senha incorretos!" });
    }
});

// Rota protegida - Painel Administrativo
app.get('/admin', (req, res) => {
    if (!req.session.usuario) {
        return res.redirect('/');
    }
    res.render('admin/index');
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

import projeto from './routes/projeto.js';
app.use('/projeto', projeto)



import comentario from './routes/comentario.js';
app.use('/comentario', comentario)

import usuario from './routes/usuario.js';
app.use('/usuario', usuario);

import sequelize from "./config/banco.js"; // Importa a configuração do banco

import arquivo from './routes/arquivo.js';
app.use('/arquivo', arquivo);

sequelize.sync({ alter: true }).then(() => {
    console.log("Banco de dados sincronizado!");
});


app.listen(porta, function(){
    console.log('Servidor rodando em http://localhost:' + porta);
});
