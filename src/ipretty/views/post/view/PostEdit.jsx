import React from 'react' 
import PostForm from '../components/PostForm'
import { useAuth } from 'ipretty/context/AppProvider'

function PostEdit(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Postmanagement'), path: '/posts' },
    ]
    const banner_id = props.match.params.banner_id
    return(
        <React.Fragment>
            <PostForm
                isPost={true}
                links={links}
                banner_id={banner_id}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default PostEdit