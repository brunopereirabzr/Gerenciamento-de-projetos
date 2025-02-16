import express from 'express'
const router = express.Router()
import ProjetoController from "../controller/ProjetoController.js"

router.get('/', ProjetoController.index)
router.get('/cadastrar', (req, res) => {res.render('produto/cadastrar')})
router.get('/cadastrar', ProjetoController.cadastrar)

export default router