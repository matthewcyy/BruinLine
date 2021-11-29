import React, { useState, useContext } from 'react';
import UserContext from "../../../context/userContext"

function Groups() {
    const { userData, setUserData } = useContext(UserContext);

    const [allUsers, setAllUsers] = useState([])
    const [groups, setGroups] = useState([])

    return (
        <div>
            <h2 style={{textAlign: 'center'}}>
                Groups
            </h2>
            <div class="groups">
                <p class="infoTitle">Groups:</p>
                <ul>
                    {groups.map(group => {
                        return <li class="infoList">{group.groupName}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}
export default Groups;