//Incident list component.

import IncidentCard from './IncidentCard';

function IncidentList({ incidents }) {
    return (
        <div className="panel incidents-list-panel">
            <table className="incidents-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.map((incident) => (
                        <IncidentCard key={incident.id} incident={incident} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default IncidentList;
