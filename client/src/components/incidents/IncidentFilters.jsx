//Filters component
//Shows UI for filtering incidents by status, severity, and search term

function IncidentFilters({ selectedStatus, onStatusChange, 
                          selectedSeverity, onSeverityChange,
                          searchTerm, onSearchChange
 }) {
    return (
        <div className="filters">
      <div className="filter-field">
      <label htmlFor="status-filter">Status</label>
        <select id = "status-filter"
                value = {selectedStatus}
                onChange = {(event) => onStatusChange(event.target.value)}>
            <option value = "all">All</option>
            <option value = "open">Open</option>
            <option value = "investigating">Investigating</option>
            <option value = "resolved">Resolved</option>
        </select>
      </div>
      <div className="filter-field">
        <label htmlFor="severity-filter">Severity</label>

    <select
        id="severity-filter"
        value={selectedSeverity}
        onChange={(event) =>
        onSeverityChange(event.target.value)
      }
    >
      <option value="all">All</option>
      <option value="critical">Critical</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>
      </div>
      <div className="filter-field filter-field-search">
    <label htmlFor="incident-search">Search</label>
  <input
    id="incident-search"
    type="text"
    value={searchTerm}
    onChange={(event) =>
    onSearchChange(event.target.value)
    }
    placeholder="Search incidents..."
  />
      </div>
        </div>
    )
}
export default IncidentFilters;
