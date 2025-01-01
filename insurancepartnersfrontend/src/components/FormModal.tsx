import React from "react";
import { Button } from "react-bootstrap";
import { InfoModalProps } from "./InfoModal";

interface FormModalProps extends InfoModalProps {
    onSave: () =>void
}

export const FormModal: React.FC<FormModalProps> = ({ title, children, onSave, onClose }) => {

    return (
        <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <Button type="button" className="btn-close" onClick={onClose}></Button>
                    </div>
                    <div className="modal-body row justify-content-center">{children}</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onSave}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

