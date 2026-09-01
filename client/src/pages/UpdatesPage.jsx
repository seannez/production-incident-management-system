import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUpdates } from "../api/updatesApi";

export default function UpdatesPage(){
    const [updates, setUpdates] = useState([])
    const [selectedType, setSelectedType] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(()=>{
        async function loadUpdates(){
            const result = await fetchAllUpdates()
            setUpdates(result)
        }
        loadUpdates()
    }, [])

    //combines filter of both type and search term
    const filteredUpdates = updates.filter((update) => {
        //filter by type
        const matchesType =
        selectedType === "all" ||
        update.updateType === selectedType;
        //filter by search term
        const matchesSearch =
            update.incidentTitle
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        return matchesType && matchesSearch;
  });

  return (
    <main className="updates-page">
      <div className="updates-page-heading">
        <div>
          <h1>Updates</h1>
          <p>Recent activity across all incidents</p>
        </div>
        <span className="updates-count">{filteredUpdates.length} updates</span>
      </div>

      <div className="updates-toolbar">
        <div className="updates-search-field">
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>

        <div className="updates-type-field">
          <label htmlFor="updates-type">Update type</label>
          <select
            id="updates-type"
            value={selectedType}
            onChange={(event) =>
              setSelectedType(event.target.value)
            }
          >
            <option value="all">All Updates</option>
            <option value="manual">Manual Updates</option>
            <option value="status_change">
              Status Changes
            </option>
          </select>
        </div>
      </div>

      <section className="panel updates-feed">
        <div className="updates-feed-heading">
          <h2>Activity feed</h2>
          <p>Incident notes and status changes, newest first.</p>
        </div>

        <div className="updates-feed-list">
          {filteredUpdates.length === 0 ? (
            <div className="updates-empty">No updates match your filters.</div>
          ) : (
            filteredUpdates.map((update) => (
              <article className="updates-feed-item" key={update.id}>
                <div className="updates-feed-marker" />
                <div className="updates-feed-content">
                  <div className="updates-feed-topline">
                    <div className="updates-feed-incident">
                      <Link to={`/incidents/${update.incidentId}`}>
                        {update.incidentTitle}
                      </Link>
                      <span className={`badge sev-${update.severity}`}>
                        {update.severity}
                      </span>
                    </div>
                    <time>{new Date(update.createdAt).toLocaleString()}</time>
                  </div>

                  <p className="updates-feed-message">{update.message}</p>

                  <div className="updates-feed-meta">
                    <span className="updates-author">{update.createdBy}</span>
                    <span className={`updates-type updates-type-${update.updateType}`}>
                      {update.updateType === "status_change" ? "Status change" : "Manual update"}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
