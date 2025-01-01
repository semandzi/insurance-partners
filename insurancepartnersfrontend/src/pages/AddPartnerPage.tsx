import React, { useState } from 'react';
import PartnerForm from "../components/PartnerForm";
import { createPartner, updatePartner } from '../services/partnerApi';
import { Partner } from '../types/Partner';
import { useLocation, useNavigate }  from 'react-router-dom'


// Initial partner data 
const initialPartnerData:Partner = {
    id: 0,
    firstName: 'Senad',
    lastName: 'Mandzic',  
    partnerNumber: '11111111111111111111',
    partnerTypeId: 2,
    createdAtUtc: new Date().toISOString(),
    isForeign: false,
    gender: 'M',
    address: 'Gavellina, 10000 Zagreb',
    createdByUser: 'admin@admin.hr',
    croatianPIN: '12345678910',
    externalCode: '1234512345',
};

const AddPartnerPage: React.FC = () => {  
    const location = useLocation();
    const toEdit = location.state?.partner as Partner;
    const [partnerData, setPartnerData] = useState<Partner>(toEdit? toEdit :initialPartnerData)
    const navigate = useNavigate();
        
    const handleFormSubmit = (updatedPartnerData: Partner) => {
        setPartnerData(updatedPartnerData);
        if (partnerData.id === 0) {
            createPartner(updatedPartnerData as Partner)
                .then(_result => {
                    navigate('/')
                })                
        }
        else {
            updatePartner((updatedPartnerData as Partner).id.toString(), updatedPartnerData as Partner)
                .then(_result => {
                    navigate('/')
                })
        }
    }     
    return (
        <>
            <PartnerForm partner={partnerData} onSubmit={handleFormSubmit}></PartnerForm>            
        </>
    );
};

export default AddPartnerPage;
