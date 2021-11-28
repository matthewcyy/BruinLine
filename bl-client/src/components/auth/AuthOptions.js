import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from "../../context/userContext";
import { NavLink } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function AuthOptions () {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        history.push("/");
        localStorage.setItem("auth-token","");
    };

    return (
        <nav className="auth-options">
            {userData.user ? (
                <NavLink to="/" style={{textDecoration: 'none' }}>
                    <Button onClick={logout}>
                        <Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize: '1.25rem' }}>Logout</Box>
                    </Button>
                </NavLink>
            ) : (
                <>
                <NavLink to="/register" style={{textDecoration: 'none' }}>
                    <Button onClick={register}>
                        <Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize: '1.25rem', marginRight: '0.5rem' }}>Register</Box>
                    </Button>
                </NavLink>
                <NavLink to="/login" style={{textDecoration: 'none' }}>
                    <Button onClick={login}>
                        <Box sx={{ color: '#f8b827', fontWeight: 'bold', fontSize: '1.25rem' }}>Login</Box>
                    </Button>
                </NavLink>
                </>
            )}
        </nav>
    )
}

export default AuthOptions;