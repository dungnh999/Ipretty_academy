import React, { useContext , useState , useEffect } from "react";
import GlobalContext from "ipretty/context/calendar-event/GlobalContext";
import { makeStyles ,  CardContent, Card,  Typography } from '@material-ui/core'
import TextInput from 'ipretty/components/TextInput'
import AddButton from 'ipretty/components/AddButton'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CalendarEventService from "ipretty/services/CalendarEventService"
import { useNotiStackContext } from 'ipretty/context/Notistack';

const useStyles = makeStyles(theme => ({
    labels : {
        alignItems : 'center',
        marginTop : 20,
        display : 'block',
        '& .labels__course' : {
          paddingBottom : 24,
        }
    },
    labels__card : {
      marginTop : 20,
      height : 345,
      overflow: 'auto',  
      [theme.breakpoints.down('xs')]: {
        marginTop : 0,
        height : 0,
    },//fix lịch  
    },
    views : {
      paddingBottom : 12,
      '& .card' : {
        '& .cardContent' :{
          '& .cardContent__title' : {
              display : 'flex',
              '& .title' : {
                paddingLeft : '8px',
                fontSize : 16,
                fontWeight : '600',
                color : '#395B65',
                fontFamily : 'San Francisco Text',
              }
          },
          '& .cardContent__dateTime' :{
            fontSize : 12,
            fontFamily : 'San Francisco Text',
            color : '#6F9396'
          },
          '& .cardContent__buttonApproved' :{
            display : 'flex',
            paddingTop : '12px',
            '& .buttonApproved__refuse' : {
                paddingLeft : '10px',
                '& .button_refuse' : {
                  height : '39px',
                  padding : '0px 8px',
                  [theme.breakpoints.down("md")]: {
                    fontSize : 13
                  },
                }
            },
            '& .buttonApproved__agree'  : {
              paddingLeft : '16px',
              '& .button_agree' : {
                // minWidth : '50px',
                height : '39px',
                [theme.breakpoints.down("md")]: {
                  fontSize : 14
                },
              }
            }
          }
        }
      }
    }
}))

export default function Labels(props) {
  const { dataCourse , dataApproved , getListEventAction , getTranslation} = props
  const classes = useStyles()
  const [loadingButtonRefuse , setLoadingButtonRefuse] = useState(false)
  const [loadingButtonAgree , setLoadingButtonAgree] = useState(false)
  const [eventId , setEventId] = useState('')
  const { makeShortMessage } = useNotiStackContext();

  function handleActionRefuse(dataId) {
    setEventId(dataId.id)
    const data = new FormData()
    data.append('event_id' , dataId.id)
    data.append('status' , 'cancel')
    CalendarEventService.approvedEventCheck(
      data,
      res => {
        makeShortMessage(getTranslation('rejectsuccessfully') ,"success")
        getListEventAction()
      },
      err => {

      }
    )
    
  }

  function handleActionAgree(dataId) {
    // setEventId(dataId.id)
    const data = new FormData()
    data.append('event_id' , dataId.id)
    data.append('status' , 'approved')
    CalendarEventService.approvedEventCheck(
      data,
      res => {
        makeShortMessage(getTranslation('acceptsuccessfully') ,"success")
        getListEventAction()
      },
      err => {

      }
    )
  }

  return (
    <React.Fragment>
      <div className={classes.labels__card}>
        {
          dataApproved && dataApproved.length ? dataApproved.map(( data , idx) => (
            <div key={idx} className={classes.views}>
              <Card className="card">
                  <CardContent className ='cardContent'>
                      <div className="cardContent__title">
                          <FiberManualRecordIcon style={{ color : data.color}} />
                          <Typography className="title">{data.title}</Typography> 
                      </div>
                      <div className="cardContent__dateTime">{data.time_start}</div>
                      <div className="cardContent__buttonApproved">
                        <div className="buttonApproved__refuse">
                          <AddButton
                              label={getTranslation('reject')}
                              id="update-button"
                              buttonClass="button button_refuse"
                              onClick={() => handleActionRefuse(data)}
                              variant='outlined'
                              disabled={false}
                              loading={loadingButtonRefuse}
                              noIcon
                          />
                        </div>
                        <div className="buttonApproved__agree">
                          <AddButton
                              label={getTranslation('accept')}
                              id="update-button"
                              noIcon
                              buttonClass="button button_agree"
                              onClick={() => handleActionAgree(data)}
                              variant='contained'
                              disabled={false}
                              loading={loadingButtonAgree}
                          />
                        </div>
                      </div>
                  </CardContent>
              </Card> 
          </div>
        )) : '' }
      </div>
    </React.Fragment>
  );
}