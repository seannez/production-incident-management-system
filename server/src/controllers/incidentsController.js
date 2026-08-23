// Placeholder for incidents controller.
const incidents = [
  {
    id: 1,
    title: "Payment API unavailable",
    description: "Payment requests are returning HTTP 500 errors.",
    severity: "critical",
    status: "open",
    affectedService: "Payments API",
    assignedTo: "Shon",
    createdAt: "2026-08-10T17:30:00",
  },
  {
    id: 2,
    title: "Slow database queries",
    description: "Several queries are taking more than 5 seconds.",
    severity: "high",
    status: "investigating",
    affectedService: "PostgreSQL",
    assignedTo: "Daniel",
    createdAt: "2026-08-10T16:15:00",
  },
  {
    id: 3,
    title: "Authentication timeout",
    description: "Some users are experiencing login timeouts.",
    severity: "medium",
    status: "resolved",
    affectedService: "Authentication Service",
    assignedTo: "Noa",
    createdAt: "2026-08-10T13:45:00",
  },
  {
  id: 4,
  title: "Email notifications delayed",
  description: "Incident alert emails are being delivered several minutes late.",
  severity: "low",
  status: "open",
  affectedService: "Notification Service",
  assignedTo: "Unassigned",
  createdAt: "2026-08-23T12:00:00",
}
];

export function getAllIncidents(req, res){
    res.status(200).json(incidents);
}

export function getIncidentById(req, res) {
    //console.log("GET INCIDENT", req.params.id);
    const id = Number(req.params.id);
    const incident = incidents.find((incident) => incident.id === id);

    if (!incident) {
        return res.status(404).json({ message: "Incident not found" });
    }
    res.status(200).json(incident);
}
