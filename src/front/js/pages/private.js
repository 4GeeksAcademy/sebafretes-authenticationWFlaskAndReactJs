import React, { useContext, useEffect } from "react";
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const Private = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
        }
        actions.getProfile();
    }, [])

    return (
        <>
            {
                !store.token &&
                <h2 className="text-center">This route is for Authorized Users only</h2>
            }
            {
                store.token &&
                <>
                    <h2 className="text-center">
                        {store.profile && store.profile.email}
                    </h2>
                </>
            }



        </>
    )
}