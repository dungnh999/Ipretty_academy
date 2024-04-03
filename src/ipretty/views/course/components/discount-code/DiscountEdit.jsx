import React from 'react' 
import DiscountForm from './DiscountForm'
import { useAuth } from 'ipretty/context/AppProvider'

function DiscountEdit(props) {
    const { setIsShowPopupEditDiscount , setIsShowPopupListDiscount , id , getDataAfterSave} = props
    const { getTranslation } = useAuth()
    return(
        <React.Fragment>
            <DiscountForm 
                discount_id={id}
                getDataAfterSave={getDataAfterSave}
                getTranslation={getTranslation}
                setIsShowPopupEditDiscount={setIsShowPopupEditDiscount}
                setIsShowPopupListDiscount={setIsShowPopupListDiscount}
            />
        </React.Fragment>
    )
}

export default DiscountEdit