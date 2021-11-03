import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import ErrorNotice from "./ErrorNotice";

function Registration() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordVerify, setPasswordVerify] = useState();
    const [username, setUsername] = useState();
    const [error, setError] = useState();
    // let history = useHistory();
    const favFood = [""];

    const submit = async (e) => {
        e.preventDefault();
        try{
            const newUser = {email, password, passwordVerify, username, favFood};
            console.log(newUser);
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginResponse = await axios.post("http://localhost:5000/users/login", {
                email, password
            });
            console.log(loginResponse.data);
            localStorage.setItem("auth-token", loginResponse.data.token);
            // history.push("/login");
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };

    return ( 
        <div className="register">
            <h2>Register</h2>
            {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
            <form onSubmit={submit}>
                <label>Email: </label>
                <input type="email" id="email" onChange={e => setEmail(e.target.value)}/>
                <label>Password: </label>
                <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
                <input type="password" placeholder="Confirm password" onChange={e => setPasswordVerify(e.target.value)}/>
                <label>Display name </label>
                <input type="text" id="dsplay-name" onChange={e => setUsername(e.target.value)}/>
                <input type="submit" value="Register" className="btn btn-primary" />
            </form>
        </div>
        );
}

export default Registration;