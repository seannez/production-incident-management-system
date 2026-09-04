
export async function fetchAllUpdates(){
    const response = await fetch(`http://localhost:3001/api/updates`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Failed to fetch all updates")
    }

    return response.json()
}
