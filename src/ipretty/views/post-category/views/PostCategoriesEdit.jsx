import React from 'react' 
import PostCategoriesForm from '../components/PostCategoriesForm'
import { useAuth } from 'ipretty/context/AppProvider'

function PostCategoriesEdit(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Postmanagement'), path: '/posts' },
        { title: getTranslation('postcategory') , path: '/post-categories'}
    ]
    const category_id = props.match.params.category_id

    return(
        <React.Fragment>
            <PostCategoriesForm
                links={links}
                category_id={category_id}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default PostCategoriesEdit