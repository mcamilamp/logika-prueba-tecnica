import React, { useState } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import '../styles/ActionModal.scss';

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: { name: string; description: string; icon?: File; color?: string; isActive?: boolean }) => void;
}

export const ActionModal: React.FC<ActionModalProps> = ({
    isOpen,
    onClose,
    onSubmit
}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState<File | null>(null);
    const [color, setColor] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const suggested_colors = [
        '#00ACC1',
        '#1E1B4B',
        '#10B981',
        '#F59E0B',
        '#EF4444',
        '#ff3da8ff'
    ]

    if(!isOpen) return null;

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();
        
        if (!icon) {
            setError('El logo es obligatorio');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await onSubmit({
                name, 
                description, 
                icon: icon,
                color: color || undefined,
                isActive
            });
            setName('');
            setDescription('');
            setIcon(null);
            setColor('');
            setIsActive(true);
            onClose();
        } catch (err) {
            setError('Hubo un error al crear la categoría. Por favor intentar de nuevo.');
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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <header className="modal-header">
                    <h2>Crear categoria</h2>
                    <button className="close-btn" onClick={onClose}><FiX /></button>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre de la categoria*</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder='Escribe el nombre de la buena acción' 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción de la buena acción*</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value.slice(0, 200))} 
                            placeholder='Agregar descripción' 
                            required
                        ></textarea>
                        <div className="char-counter">{description.length}/200</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="logo">Logo*</label>
                        <div className="file-upload-field">
                            <input 
                                type="file" 
                                id="logo" 
                                onChange={handleFileChange} 
                                accept="image/*" 
                                style={{display: 'none'}}
                            />
                            <label htmlFor="logo" className='upload-box'>
                                <span>{icon ? icon.name : 'Carga archivo'}</span>
                                <FiUploadCloud />
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="color">Color*</label>
                        <input 
                            type="text" 
                            id="color" 
                            value={color} 
                            onChange={(e) => setColor(e.target.value)} 
                            placeholder='Registra color codigo HEX'
                            required
                        />

                        <div className="color-preview-box" style={{ backgroundColor: color }}></div>
                    </div>

                    <div className="color-presets">
                        {suggested_colors.map(preset => (
                            <button
                            key={preset}
                            type='button'
                            className={`color-preset-btn ${color === preset ? 'active' : ''}`}
                            style={{backgroundColor: preset}}
                            onClick={() => setColor(preset)}
                            title={preset}
                            ></button>
                        ))}
                    </div>

                    <div className="toggle-group">
                        <label className="switch">
                            <input 
                                type="checkbox" 
                                checked={isActive} 
                                onChange={() => setIsActive(!isActive)}
                            />
                            <span className="slider round"></span>
                        </label>
                        <span className="toggle-label">Activo</span>
                    </div>
                    
                    {error && <div className='error-message'>{error}</div>}

                    <footer className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose} disabled={loading}>Cancelar</button>
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Creando...' : 'Crear'}
                        </button>
                    </footer>
                </form>
            </div>
        </div>
    )
}