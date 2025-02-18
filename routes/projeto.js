import express from 'express'
const router = express.Router()
import ProjetoController from '../controllers/ProjetoController.js'

router.get('/', ProjetoController.index)
router.get('/cadastrar', ProjetoController.cadastrar)
router.post('/salvar', ProjetoController.salvar)

export default router