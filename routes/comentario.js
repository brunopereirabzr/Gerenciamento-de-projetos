import express from "express";
import ComentarioController from "../controllers/CometarioController.js";

const router = express.Router();

router.get("/excluir/:id", ComentarioController.excluir);
router.get("/editar/:id", ComentarioController.editar);
router.post("/atualizar/:id", ComentarioController.atualizar);

export default router;
