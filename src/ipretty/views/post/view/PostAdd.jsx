import React from 'react' 
import PostForm from '../components/PostForm'
import { useAuth } from 'ipretty/context/AppProvider'

function PostAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Postmanagement'), path: '/posts' },
    ]
 
    return(
        <React.Fragment>
            <PostForm 
                isPost={true}
                isCreate={true}
                links={links}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default PostAdd