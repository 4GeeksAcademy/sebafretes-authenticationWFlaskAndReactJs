import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import { Link, useNavigate } from 'react-router-dom';

export const Register = () => {

    const [user, setUser] = useState({});
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const sendCredentials = async () => {
        const isLogged = await actions.register(user);
        if (isLogged) {
            navigate('/private');
        }
        else {
            alert('Unvalid credential');
        }
    }

    return (
        <>
            <div className="text-center">
                <h1>Register Form</h1>
                <div className="w-75 mx-auto">
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input
                            type="email" className="form-control"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input
                            type="password" className="form-control"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <Link to="/login">
                        <button onClick={() => sendCredentials()} className="btn btn-primary">Log in</button>
                    </Link>
                </div>
            </div>
        </>
    )
}