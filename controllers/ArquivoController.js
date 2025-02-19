import Arquivo from "../models/Arquivo.js";
import Projeto from "../models/Projeto.js";

class ArquivoController {

    
    async index(req, res) {
        const arquivos = await Arquivo.findAll();
        res.render("arquivo/index", {arquivos});
    }

    
    async cadastrar(req, res) {
        const projetos = await Projeto.findAll(); 
        res.render("arquivo/cadastrar", { projetos });
    }

    
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


    async editar(req, res) {
        const projetos = await Projeto.findAll(); 

        const arquivo = await Arquivo.findByPk(req.params.id)
        res.render("arquivo/editar", { arquivo }, {projetos});
    }

    async atualizar(req, res) {
        const { nome, caminho } = req.body;
        await Arquivo.update(
            { nome, caminho },
            { where: { id: req.params.id } }
        );
        res.redirect("/arquivos");
    }

    
    async excluir(req, res) {
        await Arquivo.destroy({ where: { id: req.params.id } });
        res.redirect("/arquivo");
    }
}

export default new ArquivoController();
