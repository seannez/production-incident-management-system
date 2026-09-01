//Main application component.
import { Navigate, Route, Routes } from "react-router-dom";
import IncidentsPage from "./pages/IncidentsPage";
import IncidentDetailsPage from "./pages/IncidentDetailsPage";
import { useState } from "react";
import CreateIncidentPage from "./pages/CreateIncidentPage";
import { useEffect } from "react";
import { fetchIncidents, createIncident, 
  upDateIncidentStatus as updateIncidentStatusApi} from "./api/incidentsApi";
import DashboardPage from "./pages/DashboardPage";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";
import "./AppLayout.css";
import UpdatesPage from "./pages/UpdatesPage";

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

  async function AddIncident(incidentData) {
    const newIncident = await createIncident(incidentData);
    //After DB returns the inserted row we update the frontend
    setIncidents((prevIncidents) => [newIncident, ...prevIncidents]);
  }
 //When we use the function from useState in paranthesis we get current state value
  /*function updateStatus(incidentId, newStatus) {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === incidentId ? { ...incident, status: newStatus } : incident
      )
    );
  }*/

  async function updateIncidentStatus(id, newStatus){
    const updatedIncident = await updateIncidentStatusApi(id, newStatus);
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id ? updatedIncident : incident
      )
    );
  }
  

  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-area">
        <Header />
        <div className="content">
          <div className="workspace">
            <Routes>
              <Route path="/" element={<Navigate to="/incidents" replace />} />
              <Route path="/incidents" element={<IncidentsPage incidents={incidents} />} />
              <Route path="/incidents/:id" element={<IncidentDetailsPage incidents={incidents} onStatusChange={updateIncidentStatus} />} />
              <Route path="/incidents/new" element={<CreateIncidentPage onCreateIncident={AddIncident} />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/updates" element={<UpdatesPage />} />
            </Routes>
          </div>
          <div className="details-panel panel">
            {/* visual placeholder for details; actual details page renders on route */}
            <div style={{opacity:0.7}}>Details</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
