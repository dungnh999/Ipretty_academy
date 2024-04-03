
import React from 'react'
import Time_Circle from 'public/icon_svg/Time_Circle.svg'
import IconImage from "ipretty/components/IconImage"
import moment from 'moment'
import CourseIcon from "public/icon_svg/graduationBlu.svg"
import Edit from 'public/icon_svg/Edit.svg'

function DetailEvent(props) {
    const { dataEvent , getTranslation} = props
    // console.log(dataEvent)
    return (
        <div className="detail-event">
            <div className="detail-event__title">{dataEvent.title || ''}</div>
            <div className="detail-event__item">
                <div className="detail-event__title--icon">
                    <IconImage srcIcon={Time_Circle} />
                </div>
                <div className="detail-event__title--datetime">
                    {
                        moment(dataEvent.time_start).format('DD/MM/YYYY') == moment(dataEvent.time_end).format('DD/MM/YYYY') ? 
                            <>
                                <div className="time_start">{getTranslation(moment(dataEvent.time_start).format('dddd')) + ' , ' +  moment(dataEvent.time_start).format('DD/MM/YYYY')}</div>
                                <div className="time_end">{moment(dataEvent.time_start).format('HH:mm') + ' - ' + moment(dataEvent.time_end).format('HH:mm')}</div>
                            </>
                            : 
                            <>
                                <div className="time_start">{getTranslation(moment(dataEvent.time_start).format('dddd')) + ' , ' +  moment(dataEvent.time_start).format('DD/MM/YYYY') + ' ' + moment(dataEvent.time_start).format('HH:mm')}</div>
                                <div className="time_end">{getTranslation(moment(dataEvent.time_end).format('dddd')) + ' , ' +  moment(dataEvent.time_end).format('DD/MM/YYYY') + ' ' + moment(dataEvent.time_end).format('HH:mm')}</div>
                            </>
                    }
                    {/* <div className="time_end">{moment(dataEvent.time_end).format('YYYY-MM-DD HH:mm:ss')}</div> */}
                </div>
            </div>
            {dataEvent.course && Object.keys(dataEvent.course).length > 0 && (
                <div className="detail-event__item">
                    <div className="detail-event__title--icon">
                        <IconImage srcIcon={CourseIcon} />
                    </div>
                    <div className="detail-event__title--value">
                        <div className="item-value">{dataEvent.course.course_name}</div>
                    </div>
                </div>
            )}
            <div className="detail-event__item">
                <div className="detail-event__edit--icon">
                    <IconImage srcIcon={Edit} />
                </div>
                {dataEvent.description !== '0' ? 
                    <div className="detail-event__title--value">
                        <div className="item-value--description">{dataEvent.description}</div>
                    </div> : ''
                }
            </div>
        </div>
    )
}

export default DetailEvent