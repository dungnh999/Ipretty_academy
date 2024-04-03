import React, { useEffect, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import UserService from 'ipretty/services/UserService'
import UserForm from '../components/UserForm'

function UserEdit(props) {
    const { getTranslation } = useAuth()
    const id = props.match.params.id
    const links = [
      { title: getTranslation("UserDetail"), path: `/users/${id}/detail` },
    ];
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailUser(id)
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    const getDetailUser = (id) => {
        UserService.detail(
            id,
            res => {
                setUser(res.data.data)
                setLoading(false)
            },
            err => {
                
            }
        )
    }

    return (
        <UserForm
            isEdit={true}
            links={links}
            userDetail={user}
            loading={loading}
            history={props.history}
            userId={id}
        />
    )
}

export default UserEdit