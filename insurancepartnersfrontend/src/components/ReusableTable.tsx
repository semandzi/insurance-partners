import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import '../styles/table.css';

// Define the type for table rows
interface TableRow {
    id: number;
    [key: string]: any; // Allow flexibility for additional fields
}

// Props for the reusable table component
interface ReusableTableProps<T extends TableRow> {
    headers: string[]; 
    rows: T[]; 
    renderRow: (row: T) => React.ReactNode; 
    onEdit?: (event: React.MouseEvent<HTMLButtonElement>,row: T) => void; 
    onDetails?: (event: React.MouseEvent<HTMLButtonElement>, row: T) => void; 
    onDelete?: (event: React.MouseEvent<HTMLButtonElement>, row: T) => void; 
    onSelectionCompleted?: (event: React.MouseEvent<HTMLTableRowElement>, row: T) => void;
}

// Reusable Table Component
const ReusableTable = <T extends TableRow>({
    headers,
    rows,
    renderRow,
    onEdit,
    onDetails,
    onDelete, 
    onSelectionCompleted,
}: ReusableTableProps<T>) => {    

    // State to track the selected row
    const [selectedRowId, setSelectedRowId] = useState<number | null>(rows[0]?.id);
    useEffect(() => {
        if(rows[0]?.id)
            setSelectedRowId(rows[0].id)
    },[rows])

    // Handle row click event to toggle selection
    const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, row: T, id: number) => {
        setSelectedRowId(id); // Toggle selection
        onSelectionCompleted ? onSelectionCompleted(event, row) : '';
    };

    // Get row class based on selection
    const getRowClassWithSelection = (row: T) => {
        return row.id === selectedRowId ? `selected-row` : ''
    };

    return (
        <Table bordered hover className="mt-3">
            <thead>
                <tr>
                    {headers.map((header, index) => (
                        <th key={index} style={{ border: "1px solid black", padding: "8px" }}>
                            {header}
                        </th>
                    ))}
                    {(onEdit || onDetails || onDelete) && (
                        <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                    )}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.id} onClick={(event)=>handleRowClick(event, row, row.id)} className={ getRowClassWithSelection(row)}>
                        {renderRow(row)}
                        {(onEdit || onDetails || onDelete) && (
                            <td className='row d-flex g-0 gap-1 justify-content-center'>
                                {onEdit && (
                                    <button onClick={(event) => onEdit(event, row)} className='btn btn-primary btn-sm w-25'>
                                        Edit
                                    </button>
                                )}
                                {onDetails && (
                                    <button onClick={(event) => onDetails(event, row)} className='btn btn-info btn-sm w-25'>
                                        Details
                                    </button>
                                )}
                                {onDelete && (
                                    <button onClick={(event) => onDelete(event, row)} className='btn btn-danger btn-sm w-25'>
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ReusableTable;
