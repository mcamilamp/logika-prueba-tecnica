import logo from "/images/be-kind-logo.png";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
    FiHome, FiActivity, FiUsers, FiDollarSign, 
    FiShoppingBag, FiMapPin, FiLayers, FiGrid, FiLogOut 
} from "react-icons/fi";
import '../styles/Dashboard.scss';

export const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <nav>
                <a href="#"><FiHome /> Home</a>
                <a href="#"><FiActivity /> Impacto Social</a>
                <a href="#"><FiUsers /> Comunidad</a>
                <a href="#"><FiDollarSign /> Sponsors</a>
                <a href="#"><FiShoppingBag /> Marketplace</a>
                <a href="#" className="active">
                    <FiMapPin /> Acciones
                </a>
                <a href="#"><FiLayers /> Contenidos</a>
                <a href="#"><FiGrid /> Categorias de acciones</a>
            </nav>
            <button onClick={handleLogout} className="logout-button">
                <FiLogOut /> Cerrar sesión
            </button>
        </aside>
    )
}