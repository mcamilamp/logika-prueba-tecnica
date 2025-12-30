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
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await onSubmit({name, description, icon: icon || undefined});
            setName('');
            setDescription('');
            setIcon(null);
            setLoading(false);
            onClose();
        } catch (err) {
            setError('Hubo un error al crear la acción. Por favor intentar de nuevo.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]) {
            setIcon(e.target.files[0]);
        }
    };

    

}