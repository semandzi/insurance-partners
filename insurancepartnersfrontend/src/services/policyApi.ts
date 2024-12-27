import { Policy } from "../types/Policy";

const BASE_URL = "https://localhost:44316/api";


export const fetchPolicies = async (): Promise<Policy[]> => {
    const response = await fetch(`${BASE_URL}/Policy`);
    if (!response.ok) throw new Error("Failed to fetch policies");
    return response.json();
};

export const createPolicy = async (policy: Partial<Policy>): Promise<Policy> => {
    const response = await fetch(`${BASE_URL}/Policy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy),
    });
    if (!response.ok) throw new Error("Failed to create policy");
    return response.json();
};

export const updatePolicy= async (id: string, policy: Partial<Policy>): Promise<Policy> => {
    const response = await fetch(`${BASE_URL}/Policy/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy),
    });
    if (!response.ok) throw new Error("Failed to update policy");
    return response.json();
};

export const deletePolicy = async (id: string, policy: Partial<Policy>): Promise<Policy> => {
    const response = await fetch(`${BASE_URL}/Policy/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(policy)
    });
    if (!response.ok) throw new Error("Failed to delete policy")
    return response.json();
};