// ====================================
// ROTAS: OPORTUNIDADES (TEMPORÁRIO)
// ====================================

const express = require('express');
const router = express.Router();

// GET /api/opportunities - Placeholder
router.get('/', async (req, res) => {
  res.json({
    success: true,
    message: 'Rota de oportunidades em desenvolvimento',
    data: []
  });
});

module.exports = router;