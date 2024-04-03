import React from 'react' 
import BannerForm from '../components/BannerForm'
import { useAuth } from 'ipretty/context/AppProvider'

function BannerAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: 'Banner', path: '/banners' }
    ]

    return(
        <React.Fragment>
            <BannerForm 
                isCreate={true}
                links={links}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default BannerAdd