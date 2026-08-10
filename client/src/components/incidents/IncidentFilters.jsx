//Filters component.

function IncidentFilters({ selectedStatus, onStatusChange }) {
    return (
        <div>
      <label htmlFor="status-filter">
        Status:
      </label>
        <select id = "status-filter"
                value = {selectedStatus}
                onChange = {(event) => onStatusChange(event.target.value)}>
            <option value = "all">All</option>
            <option value = "open">Open</option>
            <option value = "investigating">Investigating</option>
            <option value = "resolved">Resolved</option>
        </select>
        </div>
    )
}
export default IncidentFilters;
