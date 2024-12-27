import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import { Partner } from '../types/Partner';
import { fetchPartners, deletePartner } from '../services/partnerApi';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/table.css'


const PartnerList: React.FC = () => {
    
    const [partners, setPartners] = useState<Partner[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPartners()
            .then((data: Partner[]) => {
                setPartners(data);
                setSelectedPartner(data[0])
            })
            .catch((error: any) => console.error('Error fetching partners:', error));
    }, []);
    
    const handlePartnerDetails= (partner: Partner) => {
        setSelectedPartner(partner);
        setShowModal(true);
    };

    const handlePartnerEdit = (e: React.MouseEvent<HTMLButtonElement>, partner: Partner) => {
        e.stopPropagation();
        navigate('./add-partner', { state: { partner }}); // Pass partner data via state);   
        
    };

    const handlePartnerDelete = (e: React.MouseEvent<HTMLButtonElement>, partner: Partner) => {
        e.preventDefault();
        e.stopPropagation();
        deletePartner(partner.id.toString(), partner)
            .then(() => {
                fetchPartners()
                .then((data)=>setPartners(data))
            })
           
    };

    return (
        <div>
            <div className="d-flex m-3">
                <Button className='btn btn-primary btn-sm' as={Link as any} to="/add-partner">
                    Add Partner
                </Button>
            </div>

            <Table  bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Gender</th>
                        <th>Croatian Pin</th>
                        <th>Partner Number</th>
                        <th>Partner Type Id</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map((partner) => (
                        <tr key={partner.id} onClick={() => handlePartnerDetails(partner)} className={
                            partner.id === selectedPartner?.id ? 'selected-row' : ''}>
                            <td>{partner.firstName} {partner.lastName}</td>                            
                            <td>{partner.gender}</td>
                            <td>{partner.croatianPIN}</td>
                            <td>{partner.partnerNumber}</td>
                            <td>{partner.partnerTypeId === 1 ? 'Personal' : 'Legal'}</td>
                            <td>{new Date(partner.createdAtUtc).toLocaleDateString()}</td>
                            <td className='row d-flex g-0 gap-1 justify-content-center'>
                                <Button className='btn btn-primary btn-sm w-25' onClick={(event) => handlePartnerEdit(event, partner)}>
                                    Edit
                                </Button>
                                <Button className='btn btn-secondary btn-sm w-25' onClick={() => handlePartnerDetails(partner)}>
                                    Details
                                </Button>
                                <Button className="btn btn-danger btn-sm w-25" onClick={(event) => handlePartnerDelete(event, partner)}>
                                    Delete
                                </Button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>                        
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Partner Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedPartner && (
                        <div>
                            <p><strong>Full Name:</strong> {selectedPartner.firstName} {selectedPartner.lastName}</p>
                            <p><strong>Address:</strong> {selectedPartner.address}</p>
                            <p><strong>Coatian PIN:</strong> {selectedPartner.croatianPIN}</p>
                            <p><strong>Partner Number:</strong> {selectedPartner.partnerNumber}</p>
                            <p><strong>Partner Type Id:</strong> {selectedPartner.partnerTypeId}</p>
                            <p><strong>Created By:</strong> {selectedPartner.createdByUser}</p>
                            <p><strong>External Code:</strong> {selectedPartner.externalCode}</p>
                            <p><strong>Gender:</strong> {selectedPartner.gender}</p>
                            <p><strong>IsForeign:</strong> {selectedPartner.isForeign.toString()}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PartnerList;
