import express from 'express'
import ProjetoController from '../controllers/ProjetoController.js'
const router = express.Router()

router.get('/', ProjetoController.index)
router.get('/cadastrar', ProjetoController.cadastrar)
router.post('/salvar', ProjetoController.salvar)

export default router