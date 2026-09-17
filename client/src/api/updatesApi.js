
import { API_BASE_URL } from "./config.js";

export async function fetchAllUpdates(){
    const response = await fetch(`${API_BASE_URL}/api/updates`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Failed to fetch all updates")
    }

    return response.json()
}
