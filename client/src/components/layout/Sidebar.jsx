import { NavLink } from "react-router-dom";

function Sidebar() {
	return (
		<aside className="sidebar">
			<div className="brand">
				<div className="brand-mark">!</div>
				<div>
					<div>Incident Management</div>
					<div className="brand-subtitle">Operations</div>
				</div>
			</div>

			<nav>
				<NavLink to="/incidents" className={({isActive})=> isActive? 'active':''}>Incidents</NavLink>
				<NavLink to="/dashboard" className={({isActive})=> isActive? 'active':''}>Dashboard</NavLink>
				<NavLink to="/updates" className={({isActive})=> isActive? 'active':''}>
					Updates
				</NavLink>
				<a href="#">Teams</a>
				<a href="#">Settings</a>
			</nav>

			<div className="sidebar-user">
				<div>Shon Demo</div>
				<div className="sidebar-user-role">Admin</div>
			</div>
		</aside>
	);
}

export default Sidebar;
