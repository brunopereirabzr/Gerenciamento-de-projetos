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

    res.redirect("/usuario/login");
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
