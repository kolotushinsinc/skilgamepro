import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Avatar.module.css';
import { API_URL } from '../../api/index';

interface AvatarProps {
    size?: 'small' | 'large';
}

const Avatar: React.FC<AvatarProps> = ({ size = 'small' }) => {
    const { user } = useAuth();

    if (!user) return null;

    const hasUploadedAvatar = user.avatar && user.avatar.startsWith('/uploads');

    if (hasUploadedAvatar) {
        // Use a more stable cache-busting parameter based on avatar path
        // This will only change when the avatar actually changes
        const avatarVersion = user.avatar.split('/').pop()?.split('.')[0] || 'default';
        // Remove leading slash from user.avatar to avoid double slash
        const avatarPath = user.avatar.startsWith('/') ? user.avatar.slice(1) : user.avatar;
        return (
            <img
                src={`${API_URL}/${avatarPath}?v=${avatarVersion}`}
                alt={user.username}
                className={`${styles.avatarImage} ${size === 'large' ? styles.large : styles.small}`}
            />
        );
    }

    const initials = user.username ? user.username.substring(0, 2).toUpperCase() : '??';

    return (
        <div className={`${styles.avatarInitials} ${size === 'large' ? styles.large : styles.small}`}>
            {initials}
        </div>
    );
};

export default Avatar;