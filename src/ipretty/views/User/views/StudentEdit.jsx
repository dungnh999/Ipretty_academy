import React, { useEffect, useState } from 'react'
import UserService from 'ipretty/services/UserService'
import StudentFrom from '../components/StudentForm'

function StudentEdit(props) {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getMe()
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

    const getMe = () => {
        UserService.profile (
            res => {
              setUser(res.data.user)
            },
            err => {
                console.log(err)
            }
        )
    }
    
    return (
        <StudentFrom
            departments={departments}
            isEdit={true}
            userDetail={user}
            loading={loading}
        />
    )
}

export default StudentEdit