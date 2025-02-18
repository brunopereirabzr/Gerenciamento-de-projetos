import Projeto from '../models/Projeto.js';

class ProjetoController {

    index = async function(req, res){
        const projetos = await Projeto.findAll()
        res.render('projeto/index', {projetos: projetos})
    }

    cadastrar = function (req, res) {
        res.render('projeto/cadastrar')
    }


    salvar = function (req, res) {
        var projeto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            prazo: req.body.prazo,
            status: 1
        }

        Projeto.create(projeto).then(function (){
            res.redirect('/projeto')
        })
    }

}//Fim da Classe

export default new ProjetoController()