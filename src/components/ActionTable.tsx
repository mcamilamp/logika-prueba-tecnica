import type { Action } from '../types/dashboard.types';
import { FiEdit2, FiTrash2, FiLink, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import '../styles/Dashboard.scss'; 

interface Props {
    actions: Action[];
    loading: boolean;
    pageNumber: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const ActionTable = ({ 
    actions, 
    loading, 
    pageNumber, 
    totalPages, 
    onPageChange}: Props ) => {

    if(loading) return (
        <div className="table-loading">
            Cargando datos...
        </div>

    )

    if (actions.length === 0) {
        return (
            <div className="no-data">
                No hay datos disponibles
            </div>
        );
    }

    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Nombre de la categoria</th>
                        <th>Icono de la categoria</th>
                        <th>Estado</th>
                        <th>Descripción</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {actions.map((action) => (
                        <tr key={action.id}>
                            <td>
                                <div className="name-cell">
                                    <div className="img-placeholder"></div>
                                    <span>{action.name}</span>
                                </div>
                            </td>
                            <td>
                                <div className="icon-badge">🧸</div>
                            </td>
                            <td>
                                <span className={`status-badge ${action.status.toLowerCase()}`}>{action.status}</span>
                            </td>

                            <td className="desc-cell">{action.description}</td>

                            <td>{new Date(action.creationDate).toLocaleDateString()}</td>
                    
                            <td>
                                <div className="actions-cell">
                                    <button className="action-btn"><FiEdit2 /></button>
                                    <button className="action-btn"><FiTrash2 /></button>
                                    <button className="action-btn"><FiLink /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>

            <div className="pagination">
                <span>Resultados por página <b>10</b></span>
                <div className="controls">
                    <span>{pageNumber} - {totalPages} de {totalPages * 10}</span>
                    <button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}><FiChevronLeft /></button>
                    <button disabled={pageNumber === totalPages} onClick={() => onPageChange(pageNumber + 1)}><FiChevronRight /></button>
                </div>
                                        
            </div>

        </div>   
    );
}