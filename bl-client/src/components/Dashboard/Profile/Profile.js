import React from 'react';
import './Profile.css';
import logo from '../../../images/BLINE LOGO OUTLINED.png';



function Profile() {



    return (
        <div class="container">
            <h2 class="title">Profile</h2>
            <div class="ProfilePictureContainer">
                <img src={logo} class="profilePicture" />
            </div>
            <div class="infoBoard">
                <div class="subInfo">
                    <p>Username:</p>
                    <p>Email:</p>
                    <p>Password:</p>
                    <div class="groups">
                        <p>Groups</p>
                    </div>
                </div>
                <div class="subInfo">
                    <div class="foods">
                        <p>Favorite foods:</p>
                    </div>
                    <div class="invitations">
                        <p>Invitations</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;