// ====================================
// ROTAS: PAÍSES SADC
// ====================================

const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET /api/countries - Listar todos os países
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id,
        name,
        code,
        flag_emoji,
        capital,
        currency,
        phone_prefix,
        created_at
      FROM countries 
      ORDER BY name
    `);

    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });

  } catch (error) {
    console.error('❌ Erro ao buscar países:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar países',
      error: error.message
    });
  }
});

// GET /api/countries/:id - Buscar país por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(`
      SELECT 
        c.*,
        COUNT(DISTINCT o.id) as organizations_count,
        COUNT(DISTINCT u.id) as users_count
      FROM countries c
      LEFT JOIN organizations o ON c.id = o.country_id
      LEFT JOIN users u ON c.id = u.country_id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'País não encontrado'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('❌ Erro ao buscar país:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar país',
      error: error.message
    });
  }
});

// GET /api/countries/stats/summary - Estatísticas por país
router.get('/stats/summary', async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        c.id,
        c.name,
        c.flag_emoji,
        COUNT(DISTINCT o.id) as organizations_count,
        COUNT(DISTINCT u.id) as users_count,
        COUNT(DISTINCT p.id) as projects_count
      FROM countries c
      LEFT JOIN organizations o ON c.id = o.country_id
      LEFT JOIN users u ON c.id = u.country_id
      LEFT JOIN projects p ON c.id = p.country_id
      GROUP BY c.id, c.name, c.flag_emoji
      ORDER BY c.name
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas dos países:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas dos países',
      error: error.message
    });
  }
});

module.exports = router;