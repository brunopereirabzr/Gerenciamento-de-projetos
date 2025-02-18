import Projeto from "../models/Projeto.js";
import Tarefa from "../models/Tarefa.js";
import Comentario from "../models/Comentario.js";

class ProjetoController {

    // Listar projetos e suas tarefas
    index = async function(req, res) {
        const projetos = await Projeto.findAll({
            include: [{ model: Tarefa }, { model: Comentario }] // Inclui as tarefas associadas a cada projeto
        });
        res.render("projeto/index", { projetos });
    }

    // Formulário para criar um projeto
    cadastrar = function(req, res) {
        res.render("projeto/cadastrar");
    }

    // Salvar um novo projeto
    salvar = function(req, res) {
        Projeto.create({
            nome: req.body.nome,
            descricao: req.body.descricao,
            prazo: req.body.prazo,
            status: 1
        }).then(() => res.redirect("/projeto"));
    }

    // Formulário para editar um projeto
    editar = async function(req, res) {
        const projeto = await Projeto.findByPk(req.params.id);
        res.render("projeto/editar", { projeto });
    }

    // Atualizar projeto
    atualizar = async function(req, res) {
        await Projeto.update(
            {
                nome: req.body.nome,
                descricao: req.body.descricao,
                prazo: req.body.prazo
            },
            { where: { id: req.params.id } }
        );
        res.redirect("/projeto");
    }

    // Excluir projeto
    excluir = async function(req, res) {
        await Projeto.destroy({ where: { id: req.params.id } });
        res.redirect("/projeto");
    }

    // Adicionar uma tarefa a um projeto
    adicionarTarefa = async function(req, res) {
        await Tarefa.create({
            descricao: req.body.descricao,
            projetoId: req.params.projetoId
        });
        res.redirect("/projeto");
    }

    // Adicionar uma tarefa a um projeto
    adicionarComentario = async function(req, res) {
        await Comentario.create({
            descricao: req.body.descricao,
            projetoId: req.params.projetoId
        });
        res.redirect("/projeto");
    }
}

export default new ProjetoController();
