
import React from 'react' 
import Content from './Content'

const Contents = React.memo((props) => {
    const {
        classes,
        stateContents,
        changeValueContent,
        stateError
    } = props

    return stateContents.faqs.map((content, indexContent) => (
        <React.Fragment key={indexContent}>
            <Content 
                classes={classes}
                changeValueContent={changeValueContent}
                indexContent={indexContent}
                content={content}
                stateError={stateError}
            />
        </React.Fragment>
    ))
})

export default Contents