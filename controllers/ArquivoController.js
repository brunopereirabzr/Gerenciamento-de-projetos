import Arquivo from "../models/Arquivo.js";
import Projeto from "../models/Projeto.js";

class ArquivoController {

    // Listar todos os arquivos
    async index(req, res) {
        const arquivos = await Arquivo.findAll();
        res.render("arquivo/index", {arquivos});
    }

    // Formulário para enviar um arquivo
    async cadastrar(req, res) {
        const projetos = await Projeto.findAll(); 
        res.render("arquivo/cadastrar", { projetos });
    }

    // Salvar um novo arquivo
    async salvar(req, res) {
        try {
            console.log("Recebido no body:", req.body);
            console.log("Recebido no file:", req.file);
    
            const { originalname: nome, path: caminho } = req.file;
            const { projetoId } = req.body;
    
            if (!projetoId) {
                return res.status(400).json({ error: "projetoId é obrigatório!" });
            }
    
            await Arquivo.create({ nome, caminho, projetoId });
    
            res.redirect("/projeto");
        } catch (error) {
            console.error("Erro ao salvar arquivo:", error);
            res.status(500).json({ error: "Erro ao salvar arquivo!" });
        }
    }

    // Formulário para editar um arquivo
    async editar(req, res) {
        const arquivo = await Arquivo.findByPk(req.params.id);
        res.render("arquivo/editar", { arquivo });
    }

    // Atualizar um arquivo
    async atualizar(req, res) {
        const { nome, caminho } = req.body;
        await Arquivo.update(
            { nome, caminho },
            { where: { id: req.params.id } }
        );
        res.redirect("/arquivos");
    }

    // Excluir um arquivo
    async excluir(req, res) {
        await Arquivo.destroy({ where: { id: req.params.id } });
        res.redirect("/arquivos");
    }
}

export default new ArquivoController();
