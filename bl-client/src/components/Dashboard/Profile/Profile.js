import React, { useContext, useEffect, useState } from 'react';
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

    const submit = async () => {
        try{
            const requestBody = {password, id};
            await axios.post("http://localhost:5000/users/changePassword", requestBody);
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
                    <p>Username: {username}</p>
                    <p>Email: {email}</p>
                    <div class="password">
                        <input type="password" onChange={obj => setPassword(obj.target.value)}/>
                        <button onClick={submit}>Update Password</button>
                        {/* <Button>Update Password</Button> */}
                    </div>
                    <br />
                    <div class="groups">
                        <p>Groups:</p>
                        <ul>
                            {groups.map(group => {
                                return <li>{group.groupName}</li>
                            })}
                        </ul>
                    </div>
                </div>
                <div class="subInfo">
                    <div class="foods">
                        <p>Favorite foods:</p>
                        <ul>
                            {favorites.map(foodName => {
                                if(foodName != ''){
                                    return <li>{foodName}</li>
                                }
                            })}
                        </ul>
                    </div>
                    <br />
                    <div class="invitations">
                        <p>Invitations:</p>
                        <ul>
                            {invitations.map(invite => {
                                console.log(invite[0])
                                return <li>{invite}</li>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;