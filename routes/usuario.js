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

// Rota para exibir o formulário de registro
router.get('/registro', (req, res) => {
    res.render('admin/registro'); // Crie a view 'registro.handlebars'
});

// Rota para processar o registro
router.post('/registro', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.render('admin/registro', { erro: 'Preencha todos os campos!' });
    }

    try {
        // Verificar se o usuário já existe
        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.render('admin/registro', { erro: 'E-mail já cadastrado!' });
        }

        // Criptografar a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        // Criar o usuário
        await Usuario.create({ email, senha: senhaHash });

        res.redirect('/'); // Redireciona para a tela de login
    } catch (error) {
        console.error(error);
        res.render('admin/registro', { erro: 'Erro ao registrar. Tente novamente!' });
    }
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

export default router;
