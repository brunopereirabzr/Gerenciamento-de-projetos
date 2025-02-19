import express from 'express';
import multer from 'multer';
import path from 'path';
import ArquivoController from '../controllers/ArquivoController.js';

const router = express.Router();
const upload = multer({ dest: 'arquivos/' });


router.get('/', ArquivoController.index);


router.get('/cadastrar', ArquivoController.cadastrar);


router.post('/salvar', upload.single('arquivo'), ArquivoController.salvar);


export default router;
