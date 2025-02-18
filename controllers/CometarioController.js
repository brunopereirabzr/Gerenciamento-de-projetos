import Comentario from "../models/Comentario.js";

class ComentarioController{
    excluir = async function(req, res) {
        await Comentario.destroy({ where: { id: req.params.id } });
        res.redirect("/projeto");
    }
}

export default new ComentarioController();