import express from 'express';
import PlatformRevenueController from '../controllers/platformRevenue.controller';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

/**
 * @route   GET /api/platform-revenue/stats
 * @desc    Get platform revenue statistics
 * @access  Admin only
 */
router.get('/stats', protect, PlatformRevenueController.getRevenueStats);

/**
 * @route   GET /api/platform-revenue/history
 * @desc    Get platform revenue history with pagination
 * @access  Admin only
 */
router.get('/history', protect, PlatformRevenueController.getRevenueHistory);

/**
 * @route   GET /api/platform-revenue/analytics
 * @desc    Get detailed revenue analytics for a specific period
 * @access  Admin only
 */
router.get('/analytics', protect, PlatformRevenueController.getRevenueAnalytics);

/**
 * @route   GET /api/platform-revenue/top-players
 * @desc    Get top revenue generating players
 * @access  Admin only
 */
router.get('/top-players', protect, PlatformRevenueController.getTopRevenueGenerators);

export default router;