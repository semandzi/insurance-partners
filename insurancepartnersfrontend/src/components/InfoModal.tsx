import React from "react";
import { Button } from "react-bootstrap";

export interface InfoModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, children, onClose }) => {

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <Button type="button" className="btn-close" onClick={onClose}></Button>
                    </div>
                    <div className="modal-body">{children}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

