//Main application component.
import { Navigate, Route, Routes } from "react-router-dom";
import IncidentsPage from "./pages/IncidentsPage";
import IncidentDetailsPage from "./pages/IncidentDetailsPage";
import { useState } from "react";
import CreateIncidentPage from "./pages/CreateIncidentPage";
import { useEffect } from "react";
import { fetchIncidents } from "./api/incidentsApi";

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    //Function definition
    async function loadIncidents(){
      const data =  await fetchIncidents();
      setIncidents(data);
    }
    //Function call
    loadIncidents();
  }, []);

  function AddIncident(incidentData) {
    const newData = {
      id: Date.now(),
      ...incidentData,
      status: "open",
      assignedTo: "Unassigned",
      createdAt: new Date().toISOString()
    };
    setIncidents((prevIncidents) => [newData, ...prevIncidents]);
  }
 //When we use the function from useState in paranthesis we get current state value
  function updateStatus(incidentId, newStatus) {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === incidentId ? { ...incident, status: newStatus } : incident
      )
    );
  }
  

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/incidents" replace />}
      />

      <Route
        path="/incidents"
        element={<IncidentsPage  incidents={incidents}/>}
      />

      <Route
        path="/incidents/:id"
        element={<IncidentDetailsPage incidents={incidents} onStatusChange={updateStatus} />}
      />
      <Route
        path="/incidents/new"
        element={
          <CreateIncidentPage
            onCreateIncident={AddIncident}
          />
          }
/>
    </Routes>
  );
}

export default App;
