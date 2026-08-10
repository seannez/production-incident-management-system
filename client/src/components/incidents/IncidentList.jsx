//Incident list component.

import IncidentCard from './IncidentCard';

function IncidentList({ incidents }) {
    return(
        <section>
            {incidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
            ))}
        </section>
    )
}

export default IncidentList;