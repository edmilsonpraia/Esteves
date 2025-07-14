// ====================================
// ROTAS: CANDIDATURAS (TEMPORÁRIO) 
// ====================================

const express = require('express');
const router = express.Router();

// GET /api/applications - Placeholder
router.get('/', async (req, res) => {
  res.json({
    success: true,
    message: 'Rota de candidaturas em desenvolvimento',
    data: []
  });
});

module.exports = router;