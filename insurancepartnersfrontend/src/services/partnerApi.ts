import { Partner } from "../types/Partner";

const BASE_URL = "https://localhost:44316/api";

export const fetchPartners = async (): Promise<Partner[]> => {
    const response = await fetch(`${BASE_URL}/Partner`);
    if (!response.ok) throw new Error("Failed to fetch partners");
    return response.json();
};

export const getById= async (id: string): Promise<Partner> => {
    const response = await fetch(`${BASE_URL}/Partner/${id}`);
    if (!response.ok) throw new Error("Failed to fetch partners");
    return response.json();
};


export const createPartner = async (partner: Partial<Partner>): Promise<Partner> => {
    const response = await fetch(`${BASE_URL}/Partner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partner),
    });
    if (!response.ok) throw new Error("Failed to create partner");
    return response.json();
};

export const updatePartner = async (id: string, partner: Partner): Promise<Partner> => {    
    const response =  await fetch(`${BASE_URL}/Partner/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partner),
    });   
    if (!response.ok) throw new Error("Failed to update partner");
    return response.json();
};


export const deletePartner = async (id: string, partner: Partial<Partner>): Promise<Partner> => {
    const response = await fetch(`${BASE_URL}/Partner/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(partner),
    });
    if (!response.ok) throw new Error("Failed to delete partner");
    return response.json();
};


