import { Router } from 'express';
import { getMyNotifications, markNotificationsAsRead, markNotificationAsRead } from '../controllers/notification.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.route('/').get(protect, getMyNotifications);
router.route('/read').post(protect, markNotificationsAsRead);
router.route('/:id/read').post(protect, markNotificationAsRead);

export default router;