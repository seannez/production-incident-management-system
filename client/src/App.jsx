//Main application component.
import { useState } from "react";
import IncidentsPage from "./pages/IncidentsPage";

function App() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  
   return <IncidentsPage />;
}

export default App
