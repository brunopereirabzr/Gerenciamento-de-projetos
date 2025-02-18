import Comentario from "../models/Comentario.js";

class ComentarioController{
    excluir = async function(req, res) {
        await Comentario.destroy({ where: { id: req.params.id } });
        res.redirect("/projeto");
    }

    editar = async function(req, res) {
        const comentario = await Comentario.findByPk(req.params.id);
        res.render("comentario/editar", { comentario });
    }

    atualizar = async function(req, res) {
        await Comentario.update(
            {
                descricao: req.body.descricao
            },
            { where: { id: req.params.id } }
        );
        res.redirect("/projeto");
    }

}

export default new ComentarioController();