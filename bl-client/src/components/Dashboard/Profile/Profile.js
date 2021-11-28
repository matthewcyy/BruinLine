import React, { useEffect, useState } from 'react';
import './Profile.css';
import logo from '../../../images/BLINE LOGO OUTLINED.png';
import axios from 'axios';



function Profile() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [groups, setGroups] = useState([]);
    const [favorites, setFavorites]  = useState([]); // Do the same for other data
    const [invitations, setInvitations] = useState([]);
    const [id, setId] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        async function getUserData() {
            let token = localStorage.getItem("auth-token");
            const userRes = await axios.get("http://localhost:5000/users/", {
                headers: { "x-auth-token": token },
            });
            setUsername(userRes.data.username);
            setEmail(userRes.data.email);
            setGroups(userRes.data.groups);
            setFavorites(userRes.data.favFoods);
            setInvitations(userRes.data.invitations);
            setId(userRes.data.id);
        }

        getUserData(); 
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        e.target.reset();
        try{
            const requestBody = {password, id};
            await axios.post("http://localhost:5000/users/changePassword", requestBody);
            setPassword("");
            alert("Password has been changed!")
        } catch(err) {
            err.response.data.msg && setError(err.response.data.msg)
        }
    };


    return (
        <div class="container">
            <h2 class="title">Profile</h2>
            <div class="ProfilePictureContainer">
                <img src={logo} class="profilePicture" />
            </div>
            <div class="infoBoard">
                <div class="subInfo">
                    <p class="infoTitle">Username: {username}</p>
                    <p class="infoTitle">Email: {email}</p>
                    <div class="password">
                        <form onSubmit={submit}>
                            <input type="password" id="newPassword" onChange={obj => setPassword(obj.target.value)}/>
                            <input type="submit" id="submitNewPassword" value="Update Password" />
                        </form>
                    </div>
                    <br />
                    <div class="groups">
                        <p class="infoTitle">Groups:</p>
                        <ul>
                            {groups.map(group => {
                                return <li class="infoList">{group.groupName}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div class="subInfo">
                    <div class="foods">
                        <p class="infoTitle">Favorite foods:</p>
                        <ul>
                            {favorites.map(foodName => {
                                return <li class="infoList">{foodName}</li>
                            })}
                        </ul>
                    </div>
                    <br />
                    <div class="invitations">
                        <p class="infoTitle">Invitations:</p>
                        <ul>
                            {invitations.map(invite => {
                                return <li class="infoList">{invite}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;