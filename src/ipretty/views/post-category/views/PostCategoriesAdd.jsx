import React, { useEffect, useState } from 'react'
import PostCategoriesForm from '../components/PostCategoriesForm'
import { useAuth } from 'ipretty/context/AppProvider'

function PostCategoriesAdd(props) {
    const { getTranslation } = useAuth()
    const [loading, setLoading] = useState(false)
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Postmanagement'), path: '/posts' },
        {title: getTranslation('postcategory') , path: '/post-categories'}
    ];
    
    return (
        <PostCategoriesForm
            links={links}
            isCreate={true}
            location={props.location}
            loading={loading}
        />
    )
}

export default PostCategoriesAdd