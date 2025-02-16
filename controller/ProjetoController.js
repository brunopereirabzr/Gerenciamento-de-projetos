import { where } from "sequelize";
import Projeto from "../models/Projeto.js";

class ProjetoController {
    index = async function (req, res){
        const projetos = await Projeto.findAll({
            order:[['descricao', 'ASC']],
            where:{
                status: 1,
            }
        });
        res.render('projeto/index', {projetos: projetos});
    }

    cadastrar = function (req, res){
        var projeto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            prazo: req.body.prazo,
        }

        Projeto.create(projeto).then(function (produto){
            req.flash('secess_msg', 'Projeto cadastrado com sucesso!')
            res.redirect('projeto')
        })
    }

    editar = function(req, res){
        Projeto.findOne({
            where:{
                id:req.params.id,
            }
        }).then(function(projeto){
            res.render('projeto/editar', {projeto: projeto})
        })
    }

    salvar = function(req, res){
        var projeto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            prazo: req.body.prazo
        }
        console.log('ID: '+req.body.id)
        Projeto.update(projeto, {
            where:{
                id: req.body.id
            }
        }).then(function(produto){
            res.redirect('/projeto')
        })
    }

}

export default new ProjetoController()