// Placeholder for incident form component.
import { useState } from "react";

function IncidentForm({onSubmit}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [severity, setSeverity] = useState("medium");
    const [affectedService, setAffectedService] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        if(!title.trim() || !description.trim() || !affectedService.trim()) {
            alert("Please fill in all required fields.");
            return;
        }
        const newIncident = {
            title,
            description,
            severity,
            affectedService,
            
        };
        onSubmit(newIncident);
    } 
    return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="title">Title:</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) =>
            setTitle(event.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label htmlFor="description">
          Description:
        </label>

        <textarea
          id="description"
          value={description}
          onChange={(event) =>
            setDescription(event.target.value)
          }
        />
      </div>

      <div className="form-row">
        <label htmlFor="severity">
          Severity:
        </label>

        <select
          id="severity"
          value={severity}
          onChange={(event) =>
            setSeverity(event.target.value)
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="affected-service">
          Affected Service:
        </label>

        <input
          id="affected-service"
          type="text"
          value={affectedService}
          onChange={(event) =>
            setAffectedService(event.target.value)
          }
        />
      </div>

      <div className="form-actions">
        <button className="new-incident-btn" type="submit">Create Incident</button>
      </div>
    </form>
  );
}
export default IncidentForm;