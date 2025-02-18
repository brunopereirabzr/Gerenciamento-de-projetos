import express from "express";
import ComentarioController from "../controllers/CometarioController.js";

const router = express.Router();

router.get("/excluir/:id", ComentarioController.excluir);
router.get("/editar/:id", ComentarioController.editar);

export default router;
