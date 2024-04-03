import React, { useEffect, useState } from 'react'
import UserService from 'ipretty/services/UserService'
import AdminForm from '../components/AdminForm'
import { useAuth } from 'ipretty/context/AppProvider'
import queryString from "query-string"

function AdminEdit(props) {
    const [user, setUser] = useState()
    const { type } = queryString.parse(props.location.search)
    const { getTranslation, logout } = useAuth()
    const [loading, setLoading] = useState(false)
    const id = props.match.params.id
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('MemberManagement'), path: '/users' },
        { title: getTranslation("Profile"), path: `/users/${id}/detail?type=${type}` },
    ];
    
    return (
        <AdminForm
            links={links}
            isEdit={true}
            location={props.location}
            loading={loading}
            id={id}
        />
    )
}

export default AdminEdit