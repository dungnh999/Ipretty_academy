import React from 'react' 
import DiscountForm from './DiscountForm'
import { useAuth } from 'ipretty/context/AppProvider'

function DiscountAdd(props) {
    const { setIsShowPopupAddDiscount , setIsShowPopupListDiscount} = props
    const { getTranslation } = useAuth()

    return(
        <React.Fragment>
            <DiscountForm 
                isCreate={true}
                getTranslation={getTranslation}
                setIsShowPopupAddDiscount={setIsShowPopupAddDiscount}
                setIsShowPopupListDiscount={setIsShowPopupListDiscount}
            />
        </React.Fragment>
    )
}

export default DiscountAdd