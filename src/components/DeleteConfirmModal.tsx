import React from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';
import '../styles/ActionModal.scss';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    actionName: string;
    onConfirm: () => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
    isOpen,
    actionName,
    onConfirm,
    onCancel,
    isLoading = false
}) => {
    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            await onConfirm();
        } catch (error) {
            console.error('Error en confirmación:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content delete-modal">
                <header className="modal-header">
                    <div className="header-title">
                        <FiAlertCircle className="alert-icon" />
                        <h2>Eliminar Acción</h2>
                    </div>
                    <button className="close-btn" onClick={onCancel} disabled={isLoading}>
                        <FiX />
                    </button>
                </header>

                <div className="modal-body">
                    <p>¿Estás seguro de que deseas eliminar la acción <strong>"{actionName}"</strong>?</p>
                    <p className="warning-text">Esta acción no se puede deshacer.</p>
                </div>

                <footer className="modal-actions">
                    <button 
                        type="button" 
                        className="cancel-btn" 
                        onClick={onCancel}
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button 
                        type="button" 
                        className="delete-confirm-btn" 
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Eliminando...' : 'Eliminar'}
                    </button>
                </footer>
            </div>
        </div>
    );
};
