import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getActions, createAction, deleteAction } from '../services/actionService';
import type { Action, PaginatedResponse } from '../types/dashboard.types';
import { ErrorMessage } from '../components/ErrorMessage';
import '../styles/Dashboard.scss';
import { Sidebar } from '../components/Sidebar';
import { ActionTable } from '../components/ActionTable';
import { ActionModal } from '../components/ActionModal';
import { FiSearch, FiFilter } from "react-icons/fi";

const logoWhite = "/images/be-kind-blanco-logo.png";

export const Dashboard = () => {
    const { token } = useAuth();

    const [data, setData] = useState<PaginatedResponse<Action> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateAction = async (formData: { 
        name: string; 
        description: string; 
        icon?: File;
        color?: string;
        isActive?: boolean;
    }) => {
        if (!token) return;
        try {
            await createAction(token, formData);
            // Si tiene éxito, se actualiza la tabla
            fetchActions(pageNumber, pageSize);
        } catch (err) {
            console.error('Error creating action:', err);
            throw err;
        }
    };

    const handleDeleteAction = async (actionId: string) => {
        if (!token) return;
        try {
            await deleteAction(token, actionId);
            // Refrescar la tabla
            fetchActions(pageNumber, pageSize);
        } catch (err) {
            console.error('Error deleting action:', err);
            throw err;
        }
    };

    const fetchActions = async (page: number, size: number) => {
        if(!token) return;
        
        try {
            setLoading(true);
            const response = await getActions(token, page, size);
            setData(response);
            setError(null);
        } catch (err: any) {
            console.error('Dashboard Error:', err);
            const status = err.response?.status;
            let msg = 'Error al cargar las acciones.';
            
            if (status === 403) msg += ' Acceso prohibido (403).';
            else if (status === 401) msg += ' Sesión expirada o no autorizada (401).';
            else if (!navigator.onLine) msg = 'Sin conexión a internet.';
            else msg += ` Status: ${status || 'Unknown'}`;

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(token) fetchActions(pageNumber, pageSize);
    }, [pageNumber, pageSize, token]);

    return (
        <div className="dashboard-layout">
            <header className="top-bar">
                <img className='logo' src={logoWhite} alt="Logo" />
                <div className="user-info">A</div>
            </header>

            <div className="content-wrapper">
                <Sidebar />

                <main className="main-content">
                    <h1>Acciones</h1>

                    <div className="tabs">
                        <button className="active">Listado</button>
                        <button>Tipos de acciones</button>
                    </div>

                    <div className="actions-bar">
                        <div className="search-group">
                            <div className="search-input">
                                <FiSearch />
                                <input type="text" placeholder="Buscar" />
                            </div>

                            <button className="button-filter-btn">
                                <FiFilter /> Filtros
                            </button>
                        </div>

                        <button 
                            className="button-create-btn"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Crear tipo de acción
                        </button>
                    </div>

                    {error && <ErrorMessage message={error} />}

                    <ActionTable
                        actions={data?.data || []}
                        loading={loading}
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={data?.totalPages || 0}
                        totalElements={data?.totalElements || 0}
                        onPageChange={setPageNumber}
                        onPageSizeChange={(newSize) => {
                            setPageSize(newSize);
                            setPageNumber(1);
                        }}
                        onDelete={handleDeleteAction}
                    />

                    <ActionModal 
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateAction}
                    />
                </main>
            </div>
        </div>
    )
}

export default Dashboard;
