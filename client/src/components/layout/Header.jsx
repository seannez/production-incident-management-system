import { Link } from "react-router-dom";

function Header({ title = 'Incidents', subtitle = 'Track, manage and resolve incidents' }) {
	return (
		<header className="header">
			<div className="title">
				<h1>{title}</h1>
				<p>{subtitle}</p>
			</div>
			<div>
				<Link to="/incidents/new">
					<button className="new-incident-btn">+ New Incident</button>
				</Link>
			</div>
		</header>
	);
}

export default Header;
