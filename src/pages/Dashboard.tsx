import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getActions } from '../services/actionService';
import type { Action, PaginatedResponse } from '../types/dashboard.types';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import logo from "../../public/images/be-kind-logo.png";
import logoWhite from "../../public/images/be-kind-blanco-logo.png";
import '../styles/Dashboard.scss';
import { Sidebar } from '../components/Sidebar';
import { ActionTable } from '../components/ActionTable';

import { FiHome, FiLogOut, FiPlus, FiChevronLeft, FiChevronRight, FiSearch, FiFilter } from "react-icons/fi";

export const Dashboard = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState<PaginatedResponse<Action> | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // función para cargar datos
    const fetchActions = async (page: number) => {
        if(!token) return;
        try {
            setLoading(true);
            const response = await getActions(token, page);
            setData(response);
            setError(null);
        } catch (err) {
            setError('Error al cargar las acciones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchActions(pageNumber);
    }, [pageNumber]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="dashboard-layout">

            <header className="top-bar">
                <img className='logo' src={logoWhite} alt="Logo" />
                <div className="user-info">A</div>
            </header>

            <div className="content-wrapper">
                <Sidebar />

                <main className="main-content">
                    <h1>Categorías</h1>

                    <div className="tabs">
                        <button className="active">Categorías</button>
                        <button>Tipos</button>
                        <button>Evidencias</button>
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

                        <button className="button-create-btn">
                            Crear tipo de categoría
                        </button>
                    </div>

                    <ActionTable
                        actions={data?.items || []}
                        loading={loading}
                        pageNumber={pageNumber}
                        totalPages={data?.totalPages || 0}
                        onPageChange={setPageNumber}
                    />
                </main>
            </div>
        </div>
    )

    

}

export default Dashboard;