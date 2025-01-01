import React, {  useState } from 'react';
import { Form, Button} from 'react-bootstrap';
import { Partner } from '../types/Partner';
import { validatePartnerData } from '../utils/DataValidation';

interface PartnerFormProps {
    partner: Partner;
    onSubmit: (partner: Partner) => void
}

const PartnerForm: React.FC<PartnerFormProps> = ({ partner, onSubmit }) => {
   
    const [formData, setFormData] = useState<Partner>(partner)           
    const [errors, setErrors] = useState<Record<string, string>>({})
   
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] : type==='checkbox'? checked : value, 
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validatePartnerData(formData as Partner)
        if (Object.keys(validationErrors).length === 0) {                       
            onSubmit(formData)            
        } else {
            setErrors(validationErrors);
        }                
    };

    return (
        
        <div className="d-flex flex-column flex justify-content-center align-items-center p-1">
            <h2>Add New Partner</h2>            
            <Form onSubmit={handleSubmit} className="row gap-2 p-2 rounded-3 justify-content-center shadow "
                style={{ maxWidth: '400px'}}>
                <Form.Group>              
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder = "First Name"
                        required
                    />
                    {errors.firstName && <span className='text-danger'>{errors.firstName}</span>}
                </Form.Group> 
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                    />
                </Form.Group>
                {errors.lastName && <span className='text-danger'>{errors.lastName}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                    />
                </Form.Group>
                {errors.address && <span className='text-danger'>{errors.address}</span>}
                <Form.Group>                    
                    <Form.Control className="form-control text-dark bg-green"
                        type="text"                        
                        name="partnerNumber"
                        value={formData.partnerNumber}
                        onChange={handleChange}
                        placeholder="Partner Number"
                        required
                    />
                </Form.Group>
                {errors.partnerNumber && <span className='text-danger'>{errors.partnerNumber}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="partnerTypeId"
                        value={formData.partnerTypeId}
                        onChange={handleChange}
                        placeholder="Partner Type Id"
                        required
                    />
                </Form.Group>
                {errors.partnerTypeId && <span className='text-danger'>{errors.partnerTypeId}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="croatianPIN"
                        value={formData.croatianPIN}
                        onChange={handleChange}
                        placeholder="Croatian PIN"                        
                    />
                </Form.Group>
                {errors.croatianPIN && <span className='text-danger'>{errors.croatianPIN}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="date"
                        name="createdAtUtc"
                        value={formData.createdAtUtc}
                        onChange={handleChange}
                        placeholder="Select Date"
                        
                    />
                </Form.Group>
                {errors.createdAtUtc && <span className='text-danger'>{errors.createdAtUtc}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="createdByUser"
                        value={formData.createdByUser}
                        onChange={handleChange}
                        placeholder="Created By User"
                        required
                    />
                </Form.Group>
                {errors.createdByUser && <span className='text-danger'>{errors.createdByUser}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="externalCode"
                        value={formData.externalCode}
                        onChange={handleChange}
                        placeholder="External Code"
                        required
                    />
                </Form.Group>
                {errors.externalCode && <span className='text-danger'>{errors.externalCode}</span>}
                <Form.Group>                    
                    <Form.Control
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Gender M | F | N"
                        required
                    />
                </Form.Group>
                {errors.gender && <span className='text-danger'>{errors.gender}</span>}
                <Form.Group className="row d-flex align-items-center justify-content-center">
                    <Form.Label className="col h-100 text-end" >Is Foreign</Form.Label>
                    <div className='col ms-auto h-100'>
                        <Form.Control style={{ width: '20px', height: '20px', appearance: 'auto' }}
                            type="checkbox"
                            name="isForeign"
                            checked={formData.isForeign}
                            onChange={handleChange}                           
                        />
                    </div>                    
                </Form.Group>                
                <Button type="submit">Save Partner</Button>
            </Form>
        </div>
    );
};

export default PartnerForm;


