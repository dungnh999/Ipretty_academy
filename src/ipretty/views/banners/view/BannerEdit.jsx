import React from 'react' 
import BannerForm from '../components/BannerForm'
import { useAuth } from 'ipretty/context/AppProvider'

function BannerEdit(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: 'Banner', path: '/banners' },
    ]
    const banner_id = props.match.params.banner_id
    return(
        <React.Fragment>
            <BannerForm
                links={links}
                banner_id={banner_id}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default BannerEdit