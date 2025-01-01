import React, { useEffect, useState } from "react";
import ReusableTable from "../components/ReusableTable";
import { Partner } from "../types/Partner";
import { deletePartner, fetchPartners } from "../services/partnerApi";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { InfoModal } from "../components/InfoModal";
import AddPolicy from "../components/AddPolicy";
import { fetchPolicies } from "../services/policyApi";
import { Policy } from "../types/Policy";



const PartnerPage: React.FC = () => {

    const [partners, setPartners] = useState<Partner[]>([]);
    const [selectedPartner, setSelectedPartner] = useState<Partner>();
    const [showFormModal, setFormModal] = useState(false);
    const [showInfoModal, setInfoModal] = useState(false);
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
         fetchPartners()
            .then((data: Partner[]) => {
                const sortedPartners = data.sort((a, b) => new Date(b.createdAtUtc).getTime() - new Date(a.createdAtUtc).getTime());
                if(!selectedPartner)
                    setSelectedPartner(sortedPartners[0]);
                const updatedPartnersPromises = sortedPartners.map(partner =>
                    checkAndMarkPartner(partner).then(res => {
                        // Return the updated partner for the new array.
                        return res;
                    })
                )

                Promise.all(updatedPartnersPromises).then(updated => {
                    console.log('refresh')
                    setPartners(updated);
                })
            })
            .catch((error: any) => console.error('Error fetching partners:', error));
    }, [refresh]);

    
    // Custom rendering for table rows

    const getFullName = (firstName: string, lastName: string): string => {
        return firstName + ' ' + lastName;
    }

    const renderRow = (partner: Partner) => (
        <>
            <td>{getFullName(partner.firstName, partner.lastName)}</td>
            <td >{partner.gender}</td>
            <td>{partner.croatianPIN}</td>
            <td>{partner.partnerNumber}</td>
            <td>{partner.partnerTypeId}</td>
            <td>{partner.createdAtUtc}</td>
        </>
    );

    const handleToggle = () => {
        setFormModal(true);
    };

    type PolicyResult = {
        totalAmount: number;
        arrayLength: number;
    };

    const getPartnerPoliciesAndTotalAmount = async (partner: Partner): Promise<PolicyResult> => {
        let policies: Policy[] = await fetchPolicies();
        policies = policies.filter(policy => policy.partnerId === partner.id)
        const totalAmount = policies.reduce((sum, policy) => sum + parseInt(policy.policyAmount), 0);
        const arrayLength = policies.length;
        return { totalAmount, arrayLength };
    }

    const checkAndMarkPartner = async (partner: Partner): Promise<Partner> => {
        let result = await getPartnerPoliciesAndTotalAmount(partner);
        if (result.arrayLength > 5 || result.totalAmount > 5000) {
            partner.firstName = partner.firstName.startsWith("*") ? partner.firstName : `*${partner.firstName}`
        } else {

            partner.firstName = partner.firstName.startsWith("*") ? partner.firstName.slice(1) : partner.firstName;
        }              
        return partner;        
    }

    // Callback for editing    
    const handleEdit = (event: React.MouseEvent<HTMLButtonElement>, partner: Partner) => {
        event.stopPropagation();
        event.preventDefault();
        navigate('./add-partner', { state: { partner } }); // Pass partner data via state);           
    };

    // Callback for viewing details    
    const handleDetails = (event: React.MouseEvent<HTMLButtonElement>, partner: Partner) => {
        event.stopPropagation();
        event.preventDefault();
        setSelectedPartner(partner);
        setInfoModal(true);
    };

    // Callback for deleting    
    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>, partner: Partner) => {
        event.stopPropagation();
        event.preventDefault();
        deletePartner(partner.id.toString(), partner)
            .then(() => {                
                setRefresh(!refresh);
            })
    };

    const onCloseHandle = () => {
        setInfoModal(false)
    };


    const handleActionComplete = () => {
        setFormModal(false);
        setRefresh(!refresh);
    };

    const handleSelectionCompleted = (event: React.MouseEvent<HTMLTableRowElement>, row: Partner) => {
        handleDetails(event as any, row)
    }

    return (
        <div>
            <div className="d-flex m-3 gap-2">
                <Button className='btn btn-primary btn-sm' as={Link as any} to="/add-partner">
                    Add Partner
                </Button>
                <Button className='btn btn-primary btn-sm' onClick={handleToggle}>
                    Add Policy
                </Button>
            </div>
            <h1>Partner List</h1>
            <ReusableTable
                headers={["FullName", "Gender", "Croatian Pin", 'Partner Number', 'Partner Type Id', 'Created At']}
                rows={partners}
                renderRow={renderRow}                
                onEdit={handleEdit}
                onDetails={handleDetails}
                onDelete={handleDelete}
                onSelectionCompleted={handleSelectionCompleted}
            />
            {showInfoModal && (<InfoModal title={'Partner Details'} onClose={onCloseHandle}>
                <div className="flex-column justify-content-start d-flex align-items-start">
                    <p><strong>Full Name:</strong> {selectedPartner?.firstName} {selectedPartner?.lastName}</p>
                    <p><strong>Address:</strong> {selectedPartner?.address}</p>
                    <p><strong>Coatian PIN:</strong> {selectedPartner?.croatianPIN}</p>
                    <p><strong>Partner Number:</strong> {selectedPartner?.partnerNumber}</p>
                    <p><strong>Partner Type Id:</strong> {selectedPartner?.partnerTypeId}</p>
                    <p><strong>Created By:</strong> {selectedPartner?.createdByUser}</p>
                    <p><strong>External Code:</strong> {selectedPartner?.externalCode}</p>
                    <p><strong>Gender:</strong> {selectedPartner?.gender}</p>
                    <p><strong>IsForeign:</strong> {selectedPartner?.isForeign.toString()}</p>
                </div>
            </InfoModal>)}
            <AddPolicy partnerData={selectedPartner} isOpen={showFormModal} onActionComplete={handleActionComplete}></AddPolicy>
        </div>
    );
}
export default PartnerPage;














//import PartnerList from "../components/PartnerList1";


//const PartnersPage: React.FC = () => {
    
//    return (
//        <>
//            <PartnerList></PartnerList>
//        </>  
//    )
//};

//export default PartnersPage;
