// Placeholder for dashboard page.

import { useEffect, useState } from "react";
import { fetchDashboardSummary } from "../api/dashboardApi";

export default function DashBoardPage(){
    const [summary, setSummary] = useState(null)

    useEffect(()=>{
        async function getSummary(){
            const result = await fetchDashboardSummary()
            setSummary(result)
        }
        getSummary()
    }, [])

    if(!summary){
        return <p className="dashboard-page dashboard-loading">Loading dashboard ...</p>
    }

     return (
    <main className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <h1>Dashboard</h1>
          <p>Monitor the current incident landscape at a glance.</p>
        </div>
      </div>

      <div className="dashboard-summary-grid">
        <div className="dashboard-summary-card summary-total">
          <div className="summary-card-label">Total Incidents</div>
          <div className="summary-card-value">{summary.total}</div>
          <div className="summary-card-accent" />
        </div>

        <div className="dashboard-summary-card summary-open">
          <div className="summary-card-label">Open</div>
          <div className="summary-card-value">{summary.open}</div>
          <div className="summary-card-accent" />
        </div>

        <div className="dashboard-summary-card summary-investigating">
          <div className="summary-card-label">Investigating</div>
          <div className="summary-card-value">{summary.investigating}</div>
          <div className="summary-card-accent" />
        </div>

        <div className="dashboard-summary-card summary-resolved">
          <div className="summary-card-label">Resolved</div>
          <div className="summary-card-value">{summary.resolved}</div>
          <div className="summary-card-accent" />
        </div>
      </div>

      <section className="panel dashboard-severity-panel">
        <div className="dashboard-panel-heading">
          <div>
            <h2>Incidents by Severity</h2>
            <p>Current distribution across severity levels.</p>
          </div>
        </div>

        <div className="severity-summary-grid">
          <div className="severity-summary-item">
            <span className="badge sev-critical">Critical</span>
            <strong>{summary.critical}</strong>
          </div>
          <div className="severity-summary-item">
            <span className="badge sev-high">High</span>
            <strong>{summary.high}</strong>
          </div>
          <div className="severity-summary-item">
            <span className="badge sev-medium">Medium</span>
            <strong>{summary.medium}</strong>
          </div>
          <div className="severity-summary-item">
            <span className="badge sev-low">Low</span>
            <strong>{summary.low}</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
