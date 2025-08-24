import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import adminRoutes from './routes/admin.routes';
import tournamentRoutes from './routes/tournament.routes';
import tournamentTemplateRoutes from './routes/tournamentTemplate.routes';
import notificationRoutes from './routes/notification.routes';
import paymentRoutes from './routes/payment.routes';
import chatRoutes from './routes/chat.routes';
import gameLobbySchedulerRoutes from './routes/gameLobbyScheduler.routes';
import securityRoutes from './routes/security.routes';
import sumsubRoutes from './routes/sumsub.routes';
import { corsConfig } from './middleware/security.middleware';

const app = express();

// Apply CORS middleware
app.use(cors(corsConfig));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'SkillGame Pro API is running',
    version: '1.0.0'
  });
});

// Add all routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tournaments', tournamentRoutes);
app.use('/api/tournament-templates', tournamentTemplateRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/game-lobby-scheduler', gameLobbySchedulerRoutes);
app.use('/api/security', securityRoutes);
app.use('/api/sumsub', sumsubRoutes);

export default app;