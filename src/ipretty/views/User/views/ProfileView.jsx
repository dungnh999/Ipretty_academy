import React, { useState, useEffect } from 'react';
import { useAuth } from 'ipretty/context/AppProvider';
import UserDetail from '../views/UserDetail';


function ProfileView(props) {
    return(
        <React.Fragment>
            <UserDetail
                location={props.location}
                isProfile={true}
            />
        </React.Fragment>
    )
}

export default ProfileView