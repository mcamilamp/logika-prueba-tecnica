import type { Action } from '../types/dashboard.types';
import { FiEdit2, FiTrash2, FiLink, FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import '../styles/Dashboard.scss'; 

interface Props {
    actions: Action[];
    loading: boolean;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export const ActionTable = ({ 
    actions = [],
    loading, 
    pageNumber, 
    pageSize,
    totalPages, 
    totalElements,
    onPageChange,
    onPageSizeChange}: Props ) => {

    const actionsList = Array.isArray(actions) ? actions : [];

    if(loading) return (
        <div className="table-loading">
            Cargando datos...
        </div>
    )

    if (actionsList.length === 0) {
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
                    {actionsList.map((action, index) => (
                        <tr key={action?.id || index}>
                            <td>
                                <div className="name-cell">
                                    <div className="img-placeholder"></div>
                                    <span>{action?.name || 'Cargando...'}</span>
                                </div>
                            </td>
                            <td>
                                <div className="icon-badge">
                                    {action?.icon && typeof action.icon === 'string' && action.icon.startsWith('http') ? (
                                        <img src={action.icon} alt="icon" style={{width: '24px', height: '24px', borderRadius: '4px'}} />
                                    ) : (
                                        '-'
                                    )}
                                </div>
                            </td>
                            <td>
                                <span className={`status-badge ${String(action?.status || 'Active').toLowerCase()}`}>
                                    {String(action?.status || 'Active')}
                                </span>
                            </td>

                            <td className="desc-cell">{action?.description || 'Sin descripción'}</td>

                            <td>
                                {action?.creationDate && !isNaN(Date.parse(action.creationDate))
                                    ? new Date(action.creationDate).toLocaleDateString() 
                                    : 'Reciente'}
                            </td>
                    
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
                <div className="pagination-info">
                    <span>Resultados por página</span>
                    <select 
                        className="page-size-select"
                        value={pageSize}
                        onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div className="pagination-controls">
                    <span className="page-range">
                        {((pageNumber - 1) * pageSize) + 1} - {Math.min(pageNumber * pageSize, totalElements)} de {totalElements}
                    </span>
                    
                    <div className="arrows">
                        <button disabled={pageNumber === 1} onClick={() => onPageChange(1)}>
                            <FiChevronsLeft />
                        </button>
                        <button disabled={pageNumber === 1} onClick={() => onPageChange(pageNumber - 1)}>
                            <FiChevronLeft />
                        </button>
                        <button disabled={pageNumber === totalPages} onClick={() => onPageChange(pageNumber + 1)}>
                            <FiChevronRight />
                        </button>
                        <button disabled={pageNumber === totalPages} onClick={() => onPageChange(totalPages)}>
                            <FiChevronsRight />
                        </button>
                    </div>
                </div>
            </div>
    </div>
    );
}