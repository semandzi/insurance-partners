export interface Partner {
    id: number,
    firstName: string,
    lastName: string,  
    partnerNumber: string;
    partnerTypeId: number,
    createdAtUtc: string,
    isForeign: boolean,
    gender: string,
    address?: string,
    createdByUser?: string,
    croatianPIN?: string,
    externalCode?: string
}
