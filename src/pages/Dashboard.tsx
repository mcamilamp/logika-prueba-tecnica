import { useAuth } from "../context/AuthContext";

export const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Dashboard</h1>
            <p>¡Bienvenido al área protegida!</p>
            <button 
                onClick={logout}
                style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginTop: '1rem'
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}
