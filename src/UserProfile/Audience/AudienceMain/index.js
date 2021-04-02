import React, { useState, useEffect } from 'react';
import AudienceInfo from '../AudienceInfo/index';
import AudienceList from '../AudienceList/index';
import "../../../css-modules/UserProfile/Audience/AudienceMain/style.css";

const AudienceMain = ({ userData, password, audiencePage, pageToPreview, showUserProfile }) => {
    const handleClick = (e) => {
        pageToPreview("audiencePage");
    }
    // const [userToPreview, setUserToPreview] = useState();
    const [users, setUsers] = useState([]);

    const audience = userData.audience;
    let requestUrl = userData.password ?
        `http://localhost:3000/users/` :
        `http://localhost:3000/fbUsers/`;


    useEffect(() => {
        if (!users.length) {
            (audience.forEach(user => {
                fetch(`${requestUrl}${user}`)
                    .then(response => response.json())
                    .then(data => setUsers(users => [...users, data]))
            }))
        }
    })


    return (
        <div className="details">
            <span className="details__title">
                <AudienceInfo
                    audience={audience}
                    showAudience={handleClick} />
            </span>
            {audiencePage && audience.length?
                <div className="wrapper">
                    <AudienceList
                        users={users}
                        showUserProfile={showUserProfile} />
                </div> : null}
        </div>
    )
}

export default AudienceMain;
