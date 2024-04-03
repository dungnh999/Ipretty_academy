import React from 'react' 
import TrademarkForm from '../components/TrademarkForm'
import { useAuth } from 'ipretty/context/AppProvider'

function TrademarkEdit(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Trademark'), path: '/trademarks' },
    ]
    const banner_id = props.match.params.banner_id
    return(
        <React.Fragment>
            <TrademarkForm
                links={links}
                banner_id={banner_id}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default TrademarkEdit