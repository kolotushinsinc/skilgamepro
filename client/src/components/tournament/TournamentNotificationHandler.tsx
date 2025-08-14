import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSocket } from '../../context/SocketContext';
import { useAuth } from '../../context/AuthContext';
import TournamentRedirectModal from '../modals/TournamentRedirectModal';

interface TournamentStartData {
    tournamentId: string;
    tournamentName: string;
    matchId?: string;
}

const TournamentNotificationHandler: React.FC = () => {
    const [showRedirectModal, setShowRedirectModal] = useState(false);
    const [tournamentData, setTournamentData] = useState<TournamentStartData | null>(null);
    const [countdown, setCountdown] = useState(5);
    
    const { socket } = useSocket();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!socket || !user) return;

        const handleTournamentStarted = (tournament: any) => {
            // Проверяем, зарегистрирован ли пользователь в этом турнире
            const isRegistered = tournament.players?.some((player: any) => 
                player._id === user._id && !player.isBot
            );

            if (isRegistered) {
                // Проверяем, не находится ли пользователь уже на странице турнира
                const currentPath = location.pathname;
                const tournamentPath = `/tournament/${tournament._id}`;
                const tournamentGamePath = `/tournament-game/`;

                if (!currentPath.startsWith(tournamentPath) && !currentPath.startsWith(tournamentGamePath)) {
                    console.log(`[Tournament] User is registered in started tournament ${tournament._id}, showing redirect modal`);
                    
                    setTournamentData({
                        tournamentId: tournament._id,
                        tournamentName: tournament.name
                    });
                    setCountdown(5);
                    setShowRedirectModal(true);
                }
            }
        };

        const handleTournamentMatchReady = (data: {
            tournamentId: string;
            matchId: string;
            gameType: string;
        }) => {
            // Для матчей перенаправляем сразу на игру
            const currentPath = location.pathname;
            const matchPath = `/tournament-game/${data.matchId}`;

            if (currentPath !== matchPath) {
                console.log(`[Tournament] Match ready for user, showing redirect modal to game`);
                
                setTournamentData({
                    tournamentId: data.tournamentId,
                    tournamentName: 'Tournament Match',
                    matchId: data.matchId
                });
                setCountdown(3);
                setShowRedirectModal(true);
            }
        };

        socket.on('tournamentStarted', handleTournamentStarted);
        socket.on('tournamentMatchReady', handleTournamentMatchReady);

        return () => {
            socket.off('tournamentStarted', handleTournamentStarted);
            socket.off('tournamentMatchReady', handleTournamentMatchReady);
        };
    }, [socket, user, location.pathname]);

    const handleRedirect = () => {
        if (!tournamentData) return;

        setShowRedirectModal(false);
        
        if (tournamentData.matchId) {
            // Перенаправляем на игру
            navigate(`/tournament-game/${tournamentData.matchId}`);
        } else {
            // Перенаправляем на страницу турнира
            navigate(`/tournament/${tournamentData.tournamentId}`);
        }
        
        setTournamentData(null);
    };

    return (
        <TournamentRedirectModal
            isOpen={showRedirectModal}
            tournamentName={tournamentData?.tournamentName || ''}
            countdown={countdown}
            onRedirect={handleRedirect}
        />
    );
};

export default TournamentNotificationHandler;