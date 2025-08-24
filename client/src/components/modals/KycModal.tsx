import React from 'react';
import SumsubKycModal from './SumsubKycModal';

interface KycModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const KycModal: React.FC<KycModalProps> = ({ isOpen, onClose, onSuccess }) => {
    // Переключились на использование Sumsub для всех новых верификаций
    return (
        <SumsubKycModal
            isOpen={isOpen}
            onClose={onClose}
            onSuccess={onSuccess}
        />
    );
};

export default KycModal;