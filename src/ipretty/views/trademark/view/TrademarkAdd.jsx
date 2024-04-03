import React from 'react' 
import TrademarkForm from '../components/TrademarkForm'
import { useAuth } from 'ipretty/context/AppProvider'

function TrademarkAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('Trademark'), path: '/trademarks' },
    ]
 
    return(
        <React.Fragment>
            <TrademarkForm 
                isCreate={true}
                links={links}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default TrademarkAdd