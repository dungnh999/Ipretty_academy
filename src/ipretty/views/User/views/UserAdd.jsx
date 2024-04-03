import React, { useState, useEffect } from 'react' 
import UserForm from '../components/UserForm'
import { useAuth } from 'ipretty/context/AppProvider'
import  ManagementAddUser from './ManagementAddUser'
function UserAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('MemberManagement'), path: '/users' },
    ]

    return(
        <React.Fragment>
            <ManagementAddUser 
                isCreate={true}
                links={links}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default UserAdd