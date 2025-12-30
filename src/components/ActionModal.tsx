import React, { useState } from 'react';
import { FiX, FiUpload } from 'react-icons/fi';
import '../styles/ActionModal.scss';

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { name: string; description: string; icon?: File }) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if(!isOpen) return null;

    const handleSubmit = async (e:React.FormEvent) => {
        
    }

}