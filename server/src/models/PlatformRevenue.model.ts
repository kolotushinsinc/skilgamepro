import mongoose, { Document, Schema } from 'mongoose';

export interface IPlatformRevenue extends Document {
    source: 'LOBBY' | 'TOURNAMENT';
    gameType?: string; // для лобби игр
    tournamentId?: mongoose.Types.ObjectId; // для турниров
    amount: number;
    commissionRate: number; // процент комиссии (10% для побед в лобби, 5% для ничьих)
    description: string;
    gameId?: string; // ID игровой комнаты для лобби
    players: {
        playerId: mongoose.Types.ObjectId;
        username: string;
        betAmount: number;
        result: 'WIN' | 'LOSE' | 'DRAW';
        isBot: boolean;
    }[];
    createdAt: Date;
}

const platformRevenueSchema = new Schema<IPlatformRevenue>({
    source: {
        type: String,
        enum: ['LOBBY', 'TOURNAMENT'],
        required: true
    },
    gameType: {
        type: String,
        required: function() { return this.source === 'LOBBY'; }
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament',
        required: function() { return this.source === 'TOURNAMENT'; }
    },
    amount: {
        type: Number,
        required: true
        // Убираем min: 0 чтобы разрешить отрицательные значения для выплат игрокам
    },
    commissionRate: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    description: {
        type: String,
        required: true
    },
    gameId: {
        type: String
    },
    players: [{
        playerId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        username: {
            type: String,
            required: true
        },
        betAmount: {
            type: Number,
            required: true
        },
        result: {
            type: String,
            enum: ['WIN', 'LOSE', 'DRAW'],
            required: true
        },
        isBot: {
            type: Boolean,
            required: true,
            default: false
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Индексы для быстрого поиска
platformRevenueSchema.index({ source: 1, createdAt: -1 });
platformRevenueSchema.index({ gameType: 1, createdAt: -1 });
platformRevenueSchema.index({ tournamentId: 1 });
platformRevenueSchema.index({ createdAt: -1 });

export default mongoose.model<IPlatformRevenue>('PlatformRevenue', platformRevenueSchema);