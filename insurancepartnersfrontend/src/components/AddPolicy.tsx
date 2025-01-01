import { useEffect, useState } from "react";
import { Partner } from "../types/Partner";
import { createPolicy } from "../services/policyApi";
import { Policy } from "../types/Policy";
import { validatePolicyData } from "../utils/DataValidation";
import { FormModal } from "./FormModal";
import { Form } from "react-bootstrap";

interface ChildComponentProps {
    partnerData: Partner | undefined;
    isOpen: boolean;
    onActionComplete: () => void
}

export const AddPolicy: React.FC<ChildComponentProps> = ({ partnerData, isOpen, onActionComplete }) => {
    
    const [errors, setErrors] = useState<Record<string, string>>({});    
    const [showFormModal, setShowFormModal] = useState(isOpen);
    const [formData, setFormData] = useState<Policy>({
        partnerId: 0,
        policyNumber: '',
        policyAmount:''
    })
  
    useEffect(() => {        
        setShowFormModal(isOpen) 
    },[isOpen]);

    useEffect(() => { 
        if(partnerData)
            setFormData((prevFormData) => ({ ...prevFormData, partnerId: partnerData.id }));
    }, [partnerData]);

    const onCloseHandle = () => {        ;
        setShowFormModal(false);
        onActionComplete();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target
        setFormData((prev: Policy) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        const validationErrors = validatePolicyData(formData as Policy)
        if (Object.keys(validationErrors).length === 0) {
            setErrors({});
            createPolicy(formData);
            onCloseHandle();
        } else {
            setErrors(validationErrors);
        }
    }
   
    return (
        <>
            {showFormModal && (
                <FormModal title='Add policy' onClose={onCloseHandle} onSave={handleSubmit}> 
                    <h4>Partner: {`${partnerData?.firstName} ${partnerData?.lastName}`}</h4>
                    <Form onSubmit={handleSubmit} className="row gap-2 p-2 rounded-3 shadow w-100"
                        style={{ maxWidth: '400px' }}>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="partnerId"
                                value={formData.partnerId}
                                onChange={handleChange}
                                placeholder="Partner Id"
                                hidden
                            />                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="policyNumber"
                                value={formData.policyNumber}
                                onChange={handleChange}
                                placeholder="Policy Number"
                                required
                            />
                            {errors.policyNumber && <span className='text-danger'>{errors.policyNumber}</span>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="policyAmount"
                                value={formData.policyAmount}
                                onChange={handleChange}
                                placeholder="Policy Amount"
                                required
                            />
                            {errors.policyAmount && <span className='text-danger'>{errors.policyAmount}</span>}
                        </Form.Group>
                    </Form>
                </FormModal>
            )} 
        </>                
    )
}
export default AddPolicy;
