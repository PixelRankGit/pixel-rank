const express = require('express');
const router = express.Router();

import { limparCache, removerCache, showCache, adicionarCache } from "../controllers/utilidades.controller";

router.get('/util/cache', showCache);

router.post('/util/cache/', adicionarCache);
router.post('/util/cache/apagarCache', limparCache);

router.delete('/util/cache/:chave', removerCache);