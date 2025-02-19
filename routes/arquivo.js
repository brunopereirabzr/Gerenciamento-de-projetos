import express from 'express';
import multer from 'multer';
import ArquivoController from '../controllers/ArquivoController.js';

const router = express.Router();
const upload = multer({ dest: 'arquivos/' });


router.get('/', ArquivoController.index);


router.get('/cadastrar', ArquivoController.cadastrar);


router.post('/salvar', upload.single('arquivo'), ArquivoController.salvar);

router.get("/excluir/:id", ArquivoController.excluir);

router.get("/editar/:id", ArquivoController.editar);


export default router;
