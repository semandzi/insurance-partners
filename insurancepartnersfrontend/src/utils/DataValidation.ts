import { Partner } from "../types/Partner";
import { Policy } from "../types/Policy";

// Check fisrt and last name (string, min 2, max 255)
const isValidName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 255; // Provjera duljine stringa
};

//Check if string has characters
const isNumericCharacters = (str: string): boolean => {
    return str === str.toString().replace(/\D/g, '');
}

//Checks if string is in decimal format
const isDecimal = (str: string): boolean => {
    const decimalRegex = /^-?\d+(\.\d+)?$/;
    return decimalRegex.test(str);
}

// Check PartnerNumber (exact 20 dgits)
const isValidPartnerNumber = (str: string): boolean => {
    const strWithoutLetters = str.toString().replace(/\D/g, ''); // Ensure it's a string and strip out any non-numeric characters
    const partnerNumberRegex = /^\d{20}$/; // Exact 20 digits
    return partnerNumberRegex.test(strWithoutLetters);
};

// Check CroatianPIN (11 digits, OIB)
const isValidCroatianPIN = (pin: string | undefined): boolean => {
    if (!pin) return true; // If OIB is optional than check will not happen
    const pinRegex = /^\d{11}$/; // OIB is always 11 digits
    return pinRegex.test(pin);
};

// Check PartnerTypeId (possible  1 or 2)
const isValidPartnerTypeId = (partnerTypeId: number): boolean => {
    return partnerTypeId === 1 || partnerTypeId === 2;
};

// Check CreatedAtUtc (valid date)
const isValidCreatedAtUtc = (createdAtUtc: string): boolean => {
    const date = new Date(createdAtUtc);
    return !isNaN(date.getTime()); // Provjera je li datum validan
};

// Check CreateByUser (valid email)
const isValidCreateByUser = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

// Check ExternalCode (string, min 10, max 20 characters)
const isValidExternalCode = (externalCode: string): boolean => {
    const externalCodeRegex = /^[a-zA-Z0-9]{10,20}$/; // String, between 10 ad 20 characters
    return externalCodeRegex.test(externalCode);
};

// Check Gender (M, F, N)
const isValidGender = (gender: string): boolean => {
    return ['M', 'F', 'N'].includes(gender); // Samo M, F ili N
};

export const validatePartnerData = (data: Partner) => {
    const errors: Record<string, string> = {};
    if (!isValidName(data.firstName)) {
        errors.firstName = 'First name is invalid (min 2, max 255, alphanumeric)';
    }

    if (!isValidName(data.lastName)) {
        errors.lastName = 'Last name is invalid (min 2, max 255, alphanumeric)';
    }

    if (!isValidPartnerNumber(data.partnerNumber)) {
        errors.partnerNumber = 'Partner number must be exactly 20 digits without letters';
    }

    if (!isValidCroatianPIN(data.croatianPIN)) {
        errors.croatianPIN = 'Croatian PIN (OIB) is invalid';
    }

    if (!isValidPartnerTypeId(parseInt(data.partnerTypeId.toString()))) {
        errors.partnerTypeId = 'Partner Type must be either 1 (Personal) or 2 (Legal)';
    }

    if (!isValidCreatedAtUtc(data.createdAtUtc)) {
        errors.createdAtUtc = 'CreatedAtUtc is not a valid date';
    }

    if (!isValidCreateByUser(data.createdByUser? data.createdByUser: '')) {
        errors.createdByUser = 'CreateByUser (email) is invalid';
    }

    if (!isValidExternalCode(data.externalCode?data.externalCode : '')) {
        errors.externalCode = 'External Code must be alphanumeric, min 10, max 20 characters';
    }

    if (!isValidGender(data.gender)) {
        errors.gender = 'Gender must be M, F, or N';
    }

    return errors;
};

export const validatePolicyData = (policy: Policy) => {

    const errors: Record<string, string> = {};

    if (!isNumericCharacters(policy.policyNumber))
        errors.policyNumber = 'Policy number must be number.';

    if (!isDecimal(policy.policyAmount))
        errors.policyAmount = 'Policy amount must be in decimal format.';

    return errors;
}
