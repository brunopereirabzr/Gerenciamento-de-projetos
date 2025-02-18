import express from "express";
import ProjetoController from "../controllers/ProjetoController.js";

const router = express.Router();

router.get("/", ProjetoController.index);
router.get("/cadastrar", ProjetoController.cadastrar);
router.post("/salvar", ProjetoController.salvar);

router.get("/editar/:id", ProjetoController.editar);
router.post("/atualizar/:id", ProjetoController.atualizar);
router.get("/excluir/:id", ProjetoController.excluir);

router.post("/tarefa/adicionar/:projetoId", ProjetoController.adicionarTarefa);

router.post("/comentario/adicionar/:projetoId", ProjetoController.adicionarComentario);

export default router;
