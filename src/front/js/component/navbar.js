import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from 'react-router-dom';

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-primary">Register</button>
					</Link>
					{
						!store.token &&
						<Link to="/login">
							<button className="btn btn-primary ms-4">Login</button>
						</Link>
					}
					{
						store.token && <button onClick={() => {
							actions.logout()
							navigate('/')
						}
						} className="btn btn-primary">Log Out</button>
					}
				</div>
			</div>
		</nav>
	);
};
