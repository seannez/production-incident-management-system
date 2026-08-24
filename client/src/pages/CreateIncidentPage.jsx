// Placeholder for create incident page.
import IncidentForm from "../components/incidents/IncidentForm";
import { useNavigate } from "react-router-dom";


function CreateIncidentPage({onCreateIncident}) {
    const navigate = useNavigate();

    function handleCreateIncident(incidentData) {
        console.log("Creating incident:", incidentData);
        onCreateIncident(incidentData);
        navigate("/incidents"); // Redirect to the incidents page after creation
    }

    return (
        <main className="panel create-incident-page">
            <h2 style={{marginTop:0}}>Create New Incident</h2>
            <IncidentForm onSubmit={handleCreateIncident} /> {/*Prop call*/}
        </main>
    );
}

export default CreateIncidentPage;
