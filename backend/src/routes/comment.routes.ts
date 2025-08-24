const express = require('express');
const router = express.Router();

import { getComentarios, createComentario, deleteComentario} from '../controllers/comment.controller'

router.get("/posts/:postId/comentarios", getComentarios);
router.post("/posts/:postId/comentarios", createComentario);

// router.put("/comentarios/:comentarioId", updateComentario); 
router.delete("/comentarios/:comentarioId", deleteComentario);

export default router;