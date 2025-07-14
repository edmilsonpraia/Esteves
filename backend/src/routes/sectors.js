// ====================================
// ROTAS: SETORES DE ATIVIDADE
// ====================================

const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET /api/sectors - Listar todos os setores
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id,
        name,
        icon_emoji,
        description,
        color,
        created_at
      FROM sectors 
      ORDER BY name
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('❌ Erro ao buscar setores:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar setores',
      error: error.message
    });
  }
});

// GET /api/sectors/:id - Buscar setor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(`
      SELECT 
        s.*,
        COUNT(DISTINCT p.id) as projects_count,
        COUNT(DISTINCT o.id) as opportunities_count,
        COUNT(DISTINCT us.user_id) as interested_users_count
      FROM sectors s
      LEFT JOIN projects p ON s.id = p.sector_id
      LEFT JOIN opportunities o ON s.id = o.sector_id
      LEFT JOIN user_sectors us ON s.id = us.sector_id
      WHERE s.id = $1
      GROUP BY s.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Setor não encontrado'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Erro ao buscar setor:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar setor',
      error: error.message
    });
  }
});

// GET /api/sectors/stats/summary - Estatísticas por setor
router.get('/stats/summary', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        s.id,
        s.name,
        s.icon_emoji,
        s.color,
        COUNT(DISTINCT p.id) as projects_count,
        COUNT(DISTINCT o.id) as opportunities_count,
        COUNT(DISTINCT us.user_id) as interested_users_count,
        COALESCE(AVG(p.progress), 0) as avg_progress
      FROM sectors s
      LEFT JOIN projects p ON s.id = p.sector_id
      LEFT JOIN opportunities o ON s.id = o.sector_id  
      LEFT JOIN user_sectors us ON s.id = us.sector_id
      GROUP BY s.id, s.name, s.icon_emoji, s.color
      ORDER BY projects_count DESC, s.name
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas dos setores:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas dos setores',
      error: error.message
    });
  }
});

module.exports = router;