import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";



function Sidebar() {
	const { currentUser, logout } = useAuth();
	const navigate = useNavigate();

	async function handleLogout(){
		try {
			await logout();
			navigate('/login')
		} catch (error) {
			console.log("Unable to logout: ", error)
		}

	}
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
				<NavLink to="/teams">
  					Teams
				</NavLink>
				<a href="#">Settings</a>
			</nav>

			<div className="sidebar-account">
				<div className="sidebar-account-user">
					<div className="sidebar-account-avatar" aria-hidden="true">
						{currentUser?.name?.charAt(0).toUpperCase()}
					</div>
					<div className="sidebar-account-copy">
						<strong>{currentUser?.name}</strong>
						<span>{currentUser ? "Signed in" : "Not signed in"}</span>
					</div>
				</div>

				<button className="sidebar-logout" type="button" onClick={handleLogout}>
					<span>Logout</span>
					<span aria-hidden="true">→</span>
				</button>
			</div>
		</aside>
	);
}

export default Sidebar;
