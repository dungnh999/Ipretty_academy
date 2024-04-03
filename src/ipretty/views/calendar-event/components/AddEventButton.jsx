import React from "react";
import { makeStyles } from '@material-ui/core'
import AddButton from 'ipretty/components/AddButton'
import IconImage from "ipretty/components/IconImage";
import Plus_white from "../../../../public/icon_svg/Plug_white.svg"
import { useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    addEvent : {
        display : 'flex',
        flexDirection : 'column'
    },
    titleAdd : {
       fontFamily: 'San Francisco Text Bold',
       fontSize : '20px',
       color : '#395B65',
       textAlign : 'center',
       paddingBottom : '24px',
       [theme.breakpoints.down('xs')]: {
        paddingBottom : '0px',
    },//fix lịch  
    }
}))

export default function AddEventButton(props) {
  const { setIsOpenPopup  , getTranslation , handleDateSelect} = props
  const classes = useStyles()
  const history = useHistory();
  
  function handleAdd() {
    setIsOpenPopup({ isOpen: true})
  }

  return (
    <>
        <div className={classes.addEvent}>
            <div className={classes.titleAdd}>
               {getTranslation('CalendarandEvent')}
            </div>
            {/* <AddButton
                label={getTranslation('CreateNewEvnent')}
                id="update-button"
                buttonClass="button button_add"
                onClick={handleAdd}
                variant='contained'
                disabled={false}
                // loading={loadingButton}
                iconButton={<IconImage srcIcon={Plus_white} />}
            /> */}
        </div>
    </>
  );
}