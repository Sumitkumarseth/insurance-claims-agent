const Claim = require('../models/Claim');
const logger = require('../utils/logger');

exports.getDashboard = async (req, res) => {
  try {
    const allClaims = await Claim.find();

    const totalClaims = allClaims.length;
    const highValueClaims = allClaims.filter(c => c.estimatedDamage > 50000).length;
    
    const completedClaims = allClaims.filter(c => c.status === 'completed' || c.status === 'approved');
    const avgProcessingDays = completedClaims.length > 0
      ? Math.round(
          completedClaims.reduce((sum, claim) => {
            const days = Math.ceil((new Date(claim.updatedAt) - new Date(claim.createdAt)) / (1000 * 60 * 60 * 24));
            return sum + days;
          }, 0) / completedClaims.length
        )
      : 0;

    const queueStats = {
      'fast-track': allClaims.filter(c => c.routingDecision?.queue === 'fast-track').length,
      'manual-review': allClaims.filter(c => c.routingDecision?.queue === 'manual-review').length,
      'specialist-queue': allClaims.filter(c => c.routingDecision?.queue === 'specialist-queue').length,
      'investigation': allClaims.filter(c => c.routingDecision?.queue === 'investigation').length
    };

    const statusStats = {
      pending: allClaims.filter(c => c.status === 'pending').length,
      processing: allClaims.filter(c => c.status === 'processing').length,
      approved: allClaims.filter(c => c.status === 'approved').length,
      rejected: allClaims.filter(c => c.status === 'rejected').length,
      completed: allClaims.filter(c => c.status === 'completed').length
    };

    const totalDamage = allClaims.reduce((sum, claim) => sum + (claim.estimatedDamage || 0), 0);
    const avgDamage = totalClaims > 0 ? Math.round(totalDamage / totalClaims) : 0;

    const recentClaims = allClaims
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalClaims,
          highValueClaims,
          avgProcessingDays
        },
        queueStats,
        statusStats,
        damageStats: {
          totalDamage,
          avgDamage
        },
        recentClaims
      }
    });

  } catch (error) {
    logger.error('Dashboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard data'
    });
  }
};

exports.getAnalyticsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const claims = await Claim.find(query);

    const analytics = {
      totalClaims: claims.length,
      totalDamage: claims.reduce((sum, c) => sum + (c.estimatedDamage || 0), 0),
      avgDamage: claims.length > 0 
        ? Math.round(claims.reduce((sum, c) => sum + (c.estimatedDamage || 0), 0) / claims.length)
        : 0,
      byQueue: {},
      byStatus: {}
    };

    claims.forEach(claim => {
      const queue = claim.routingDecision?.queue || 'unknown';
      analytics.byQueue[queue] = (analytics.byQueue[queue] || 0) + 1;
    });

    claims.forEach(claim => {
      analytics.byStatus[claim.status] = (analytics.byStatus[claim.status] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: analytics
    });

  } catch (error) {
    logger.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics'
    });
  }
};