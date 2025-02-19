import express from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

const router = express.Router();

// Tela de login
router.get("/login", (req, res) => {
    res.render("admin/login");
});

// Tela de registro
router.get("/registro", (req, res) => {
    res.render("admin/registro");
});

// Processar o registro
router.post("/registrar", async (req, res) => {
    const { nome, email, senha } = req.body;

    // Verifica se o usuário já existe
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
        return res.send("Erro: E-mail já cadastrado!");
    }

    // Criptografar a senha antes de salvar
    const hashSenha = await bcrypt.hash(senha, 10);

    // Criar usuário
    await Usuario.create({ nome, email, senha: hashSenha });

    res.redirect("/admin/index");
});
// Processar login
router.post("/logar", async (req, res) => {
    const { email, senha } = req.body;

    // Buscar usuário no banco
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        return res.send("Erro: Usuário não encontrado!");
    }

    // Comparar senha com hash
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        return res.send("Erro: Senha incorreta!");
    }

    // Redirecionar para a tela admin após login bem-sucedido
    res.render('admin/index');
});

// Exibir formulário de registro
router.get('/registrar', (req, res) => {
    res.render('usuario/registrar');
});

// Processar o registro do usuário
router.post('/registrar', async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Criar um novo usuário no banco de dados
        await Usuario.create({ email, senha });

        // Redirecionar para a página do painel admin
        res.redirect('/admin/');
    } catch (error) {
        console.error(error);
        res.render('usuario/registrar', { erro: "Erro ao registrar usuário. Tente novamente!" });
    }
});

// Rota para exibir a lista de usuários
router.get('/listar', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(); // Busca todos os usuários no banco
        res.render('usuario/listar', { usuarios });
    } catch (error) {
        console.error(error);
        res.render('admin/index', { erro: "Erro ao carregar usuários!" });
    }
});


// Rota para exibir o formulário de edição
router.get('/editar/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.redirect('/usuario/listar');
        }
        res.render('usuario/editar', { usuario });
    } catch (error) {
        console.error(error);
        res.redirect('/usuario/listar');
    }
});

// Rota para atualizar o usuário
router.post('/atualizar/:id', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findByPk(req.params.id);

        if (!usuario) {
            return res.redirect('/usuario/listar');
        }

        usuario.email = email;
        if (senha) usuario.senha = senha; // Atualiza a senha apenas se for informada
        await usuario.save();

        res.redirect('/usuario/listar');
    } catch (error) {
        console.error(error);
        res.redirect('/usuario/listar');
    }
});

// Rota para excluir um usuário
router.post('/excluir/:id', async (req, res) => {
    try {
        await Usuario.destroy({ where: { id: req.params.id } });
        res.redirect('/usuario/listar');
    } catch (error) {
        console.error(error);
        res.redirect('/usuario/listar');
    }
});

router.get('/admin/index', (req, res) => {
    res.render('/admin/index');  // Certifique-se de que você tenha a view "login.handlebars" ou o equivalente
});


export default router;
