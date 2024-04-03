import dayjs from "dayjs";
import React, { useContext  , useState , useMemo} from "react";
import { makeStyles } from '@material-ui/core'
import AddButton from 'ipretty/components/AddButton'
import MenuButton from 'ipretty/components/MenuButton'
import { useAuth } from "ipretty/context/AppProvider";

const useStyles = makeStyles(theme => ({
    buttonCalendar : {
        paddingTop : 16,
        display : 'flex',
        flexWrap: 'wrap',
        '& .button__reset' :{
            height : 38,
            marginBottom : 16,
        },
        '& .button__menu' : {
            paddingLeft : 9,
        }
    }
}))

export default function ButtonCalendar (props) {
  const { monthIndex , setMonthIndex} = props;
  const classes = useStyles()
  const { user, getTranslation } = useAuth();
  const [ loadingReset , setLoadingReset ] = useState(false)
  const listCalendar = useMemo(() => [
    { id: 1, action: handleDay, title: 'Ngày' },
    { id: 2, action: handleMonth, title: 'Tháng' },
    { id: 3, action: handleYear, title: 'Năm' },
] ,[])
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  function handleDay() { 
  }

  function handleMonth() {

  }

  function handleYear() {}
  return (
    <>  
        <div className={classes.buttonCalendar}>
            <div className="button__reset">
                <AddButton
                    label={'Hôm nay'}
                    id="update-button"
                    buttonClass="button button__reset"
                    onClick={handleReset}
                    variant='outlined'
                    disabled={false}
                    loading={loadingReset}
                    noIcon
                />
            </div>
            <div className="button__menu">
                <MenuButton
                    listMenu={listCalendar}
                    titleMenuButton='Tùy chọn'
                    getTranslation={getTranslation}
                />
            </div>
        </div>
    </>
  );
}