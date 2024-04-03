
import { IconButton, Tooltip, makeStyles ,Button} from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react'
import Draggable from 'react-draggable';
import Close from 'public/icon_svg/Close.svg'
import Edit from 'public/icon_svg/Edit.svg'
import Time_Circle from 'public/icon_svg/Time_Circle.svg'
import Edit_Event from 'public/icon_svg/Edit_Event.svg'
import Delete from 'public/icon_svg/Delete.svg'
import notification from 'public/icon_svg/notification.svg'
import IconImage from "ipretty/components/IconImage"
import CourseIcon from "public/icon_svg/graduationBlu.svg"
import { useAuth } from 'ipretty/context/AppProvider'
import TextInput from 'ipretty/components/TextInput'
import DatePicker from 'ipretty/components/DatePicker/DatePicker'
import moment from 'moment'
import AddButton from 'ipretty/components/AddButton'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { TwitterPicker } from 'react-color'
import DetailEvent from './DetailEvent';
import { useHistory } from "react-router-dom"

const useStyles = makeStyles(theme => ({
    popover: {
        position: 'absolute',
        zIndex: '2',
    },
    cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
    },
}))

const PopupEvent = (props) => {
    const { isDetail, createdBy, setIsOpenPopup, dataSelect, positionCalendar, handleSaveEvent, handleUpdateEvent, handleDeleteEvent, dataEventById, courses , errors, loading } = props
    const popupEvent = useRef(null)
    const classes = useStyles()
    const [offset, setOffset] = useState({ top: 200, left: 100, width: 700, height: 400 })
    const { getTranslation , user } = useAuth()
    const [dataEvent, setDataEvent] = useState({
        title: '',
        time_start: '',
        time_end: '',
        color: 'Green',
        status_reminder: 'option',
        distance_time_reminder: '',
        distance_time_reminder_2: '',
        course_id: '',
        description: ''
    })
    const [loadingSave, setLoadingSave] = useState(false)
    const [isShowColorPicker, setIsShowColorPicker] = useState(false)
    const [isEditEvent, setIsEditEvent] = useState(false)
    const [isDetailEvent, setIsDetailEvent] = useState(false)
    const [isDetailNotification, setIsDetailNotification] = useState(false)
    let history = useHistory()
    // var createBy = dataSelect.event._def.extendedProps.create_by
    // console.log(dataEvent)
    useEffect(() => {
        handleOpenDialog()
        return () => document.removeEventListener('mousedown', handleClickOutSide)
    }, [])

    useEffect(() => {
        if (isDetail) {
            if (dataEventById && Object.keys(dataEventById).length > 0) {
                setDataEvent(dataEventById)
                setIsDetailEvent(true)
                setIsDetailNotification(true)
            } else {
                const { event } = dataSelect
                const _dataInput = {
                    ...event.extendedProps,
                    title: event.title,
                    time_start: moment(event.extendedProps.time_start).format('YYYY-MM-DD HH:mm:ss'),
                    time_end: moment(event.extendedProps.time_end).format('YYYY-MM-DD HH:mm:ss'),
                    color: event._def.ui.backgroundColor,
                    id: event._def.publicId,
                    status_reminder: 'option', 
                    description : event._def.extendedProps.description,
                    course_id: event.extendedProps.course && Object.keys(event.extendedProps.course).length > 0 ? event.extendedProps.course.course_id : '',
                    create_by : event._def.extendedProps.create_by
                }
                setDataEvent(_dataInput)
                setIsDetailEvent(true)
            }
        }
    }, [dataSelect, dataEventById])

    const handleClickOutSide = (e) => {
        const elCalendar = document.querySelector('.fc-view-harness.fc-view-harness-active')
        const elAutocomplete = document.querySelector('.infomation-item__input--select')
        const elFieldsTime = document.querySelector('.infomation-item__datetime')
        if (e.target.className !== 'fc-highlight' && !elCalendar.contains(e.target) && !popupEvent.current.contains(e.target) && !(elAutocomplete || elFieldsTime)) {
            setIsOpenPopup({ isOpen: false, isDetail: false })
            document.removeEventListener('mousedown', handleClickOutSide)
        }
    }

    const handleOpenDialog = () => {
        if (dataSelect && Object.keys(dataSelect).length > 0) {
            const topClick = dataSelect.jsEvent.pageY - positionCalendar.top
            const leftClick = dataSelect.jsEvent.pageX - positionCalendar.left
            if (positionCalendar.height - topClick < offset.height && topClick - offset.height > 0) offset.top = topClick - offset.height + 100
            else offset.top = topClick + 100
            if (positionCalendar.width - leftClick < offset.width && leftClick - offset.width > 0) offset.left = leftClick - offset.width
            else offset.left = leftClick
            document.addEventListener('mousedown', handleClickOutSide)
            setOffset({ ...offset })
        } else {
            offset.top = positionCalendar.top
            offset.left = positionCalendar.left
            document.addEventListener('mousedown', handleClickOutSide)
            setOffset({ ...offset })
        }
    }

    const onChange = nameField => e => {
        setDataEvent({
            ...dataEvent,
            [nameField]: e.target.value
        })
    }


    const onChangeDatetime = nameField => e => {
        setDataEvent({
            ...dataEvent,
            [nameField]: moment(e).format('YYYY-MM-DD HH:mm:00')
        })
    }

    const onClickBtnSave = () => handleSaveEvent(dataEvent)

    const onClickUpdate = () => handleUpdateEvent(dataEvent)

    const onClickDelete = (e) => {
        e.preventDefault()
        handleDeleteEvent(dataEvent)
    }

    function handleAction() {
        setIsShowColorPicker(true)
    }
    function handleActionClose() {
        setIsShowColorPicker(false)
    }
    function handleChangeColor(color, nameField) {
        // console.log(color)
        setDataEvent({
            ...dataEvent,
            color: color.hex
        })
    }

    const OnCloseCalendar=(e)=>{
        e.stopPropagation()
        setIsOpenPopup({ isOpen: false, isDetail: false })
    }
    function editEvent() {
        setIsDetailEvent(false)
    }

    function handleClose() {
        setIsOpenPopup({ isOpen: false, isDetail: false })
        setIsDetailNotification(false)
        history.push('/calendar-events')
    }
    // console.log(dataSelect , '-----createdBy')
    return (
        <Draggable handle="strong">
            <div className={`popup-add-event `} ref={popupEvent} style={{ ...offset, }} key={1} >
            <div className="cursor1">
            {isDetailEvent ? (
                            <div className="popup-add-event__button-detail">
                                { 
                                    !isDetailNotification ? 
                                        <>
                                            { 
                                                createdBy == user.id ? 
                                                    <Tooltip title={getTranslation('Edit')}>
                                                        <IconButton className='popup-icon popup-icon-close' onClick={editEvent}>
                                                        <IconImage srcIcon={Edit_Event} />
                                                        </IconButton>
                                                    </Tooltip> : ''
                                            }
                                            <Tooltip title={getTranslation('Delete')}>
                                                <IconButton className='popup-icon popup-icon-close' onClick={(e) => onClickDelete(e)}>
                                                    <IconImage srcIcon={Delete} />
                                                </IconButton>
                                            </Tooltip> 
                                        </>
                                        : ''
                                }
                                <Tooltip title={getTranslation('Close')}>
                                    <IconButton className='popup-icon popup-icon-close' onClick={() => handleClose()}>
                                        <IconImage srcIcon={Close} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (
                            <div className='popup-add-event__button-add'>
                                <Tooltip title={getTranslation('Close')}>
                                    <IconButton className='popup-icon popup-icon-close' onClick={OnCloseCalendar}>
                                        <IconImage srcIcon={Close} />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        )}

            </div>
                <strong className="cursor">
                    <div style={{ position: 'relative', height: '38px', cursor: 'move', borderBottom: '1px solid #DADFD9', padding: '5px 10px' }}>
                       
                    </div>
                </strong>

                <div style={{ padding: '0 0 25px 0' }}>
                    {isDetailEvent ? (
                        <DetailEvent 
                            dataEvent={dataEvent}
                            getTranslation={getTranslation}
                        />
                    ) : (
                        <div className='popup-list-input'>
                            <div className="infomation">
                                <div className="infomation-item__title">
                                    {/* <IconImage srcIcon={Edit} /> */}
                                    <div className={classes.color}>
                                        <Tooltip title='Màu sự kiện'>
                                            <FiberManualRecordIcon fontSize="large" style={{ color: dataEvent.color }} onClick={handleAction} />
                                        </Tooltip>
                                        {
                                            isShowColorPicker ?
                                                <div className={classes.popover} >
                                                    <div className={classes.cover} onClick={() => handleActionClose()} />
                                                    < TwitterPicker
                                                        color={dataEvent.color}
                                                        onChange={(e) => handleChangeColor(e, 'color')}
                                                        value={dataEvent.color}
                                                        name="color"
                                                    />
                                                </div> : ''
                                        }
                                    </div>
                                </div>
                                <div className="infomation-item__input">
                                    <TextInput
                                        placeholder={getTranslation('AddTitle')}
                                        onChange={onChange('title')}
                                        fullWidth
                                        helperText={(errors && errors.title) ? errors.title : ''}
                                        error={errors && errors.title}
                                        value={dataEvent.title || ''}
                                        noMargin
                                        className={errors && errors.title ? "errorInput" : ''}
                                    />
                                </div>
                            </div>

                            <div className="infomation">
                                <div className="infomation-item__title">
                                    <IconImage srcIcon={Time_Circle} />
                                </div>
                                <div className="infomation-item__datetime">
                                    <div className="infomation-item__datetime--start">
                                        <DatePicker
                                            type={'datetime-picker'}
                                            placeholder={getTranslation('Starttime')}
                                            format={'yyyy-MM-dd HH:mm'}
                                            handleDateChange={onChangeDatetime('time_start')}
                                            value={dataEvent.time_start || null}
                                            helperText={errors && Object.keys(errors).length > 0 && errors['time_start'] ? errors['time_start'] : ''}
                                        />
                                    </div>
                                    <div className="infomation-item__datetime--end">
                                        <DatePicker
                                            type={'datetime-picker'}
                                            placeholder={getTranslation('Endtime')}
                                            format={'yyyy-MM-dd HH:mm'}
                                            handleDateChange={onChangeDatetime('time_end')}
                                            value={dataEvent.time_end || null}
                                            helperText={errors && Object.keys(errors).length > 0 && errors['time_end'] ? errors['time_end'] : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                            {
                                user.permissions.includes("manage_courses") ? 
                                    <div className="infomation">
                                        <div className="infomation-item__title">
                                            <IconImage srcIcon={CourseIcon} />
                                        </div>
                                        <div className="infomation-item__input infomation-item__input--select">
                                            <TextInput
                                                select
                                                options={courses}
                                                onChange={onChange('course_id')}
                                                fullWidth
                                                value={dataEvent.course_id || ''}
                                                noMargins                                
                                                subItem={false}
                                            />
                                        </div>
                                    </div>
                                 : ''
                            }
                            <div className="infomation">
                                <div className="infomation-item__edit" style={{width :20 , height : 20}}>
                                    <IconImage  srcIcon={Edit} />
                                </div>
                                <div className="infomation-item__input">
                                    <TextInput
                                        onChange={onChange('description')}
                                        fullWidth
                                        placeholder={getTranslation('enterDescriptionevenet')}
                                        value={dataEvent.description || ''}
                                        noMargin
                                        rows={4}
                                    />
                                </div>
                            </div>

                            <div className="infomation">
                                <div className="infomation-item__title">
                                    <IconImage srcIcon={notification} />
                                </div>
                                <div className="infomation-item__notification">
                                    <div className="infomation-item__notification--before">
                                        <TextInput
                                            placeholder={getTranslation('DistanceTimeReminder')}
                                            onChange={onChange('distance_time_reminder')}
                                            fullWidth
                                            noMargin
                                            value={dataEvent.distance_time_reminder}
                                            type={'number'}
                                            helperText={(errors && errors.distance_time_reminder) ? errors.distance_time_reminder : ''}
                                            error={errors && errors.distance_time_reminder}
                                        />
                                    </div>
                                    <div className="infomation-item__notification--after">
                                        <TextInput
                                            placeholder={getTranslation('DistanceTimeReminder2')}
                                            onChange={onChange('distance_time_reminder_2')}
                                            fullWidth
                                            noMargin
                                            value={dataEvent.distance_time_reminder_2}
                                            type={'number'}
                                            helperText={(errors && errors.distance_time_reminder_2) ? errors.distance_time_reminder_2 : ''}
                                            error={errors && errors.distance_time_reminder_2}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="button__save-event">
                                <Button size='large' className="button" onClick={() =>setIsOpenPopup({ isOpen: false, isDetail: false })} variant='outlined' color='secondary' >
                                    {getTranslation('Cancel')}
                                 </Button>
                                <AddButton
                                    label={getTranslation('Save')}
                                    id="update-button"
                                    buttonClass={''}
                                    onClick={!isDetail ? onClickBtnSave : onClickUpdate}
                                    variant='contained'
                                    // iconButton={item.icon}
                                    disabled={false}
                                    noIcon={true}
                                    loading={loading}
                                    loadingClass={''}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div >
        </Draggable >
    )

}

export default PopupEvent