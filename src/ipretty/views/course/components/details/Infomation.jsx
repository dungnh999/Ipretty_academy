
import { Typography, Avatar } from '@material-ui/core'
import React from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import BANNER_DEFAULT from '../../../../../public/icons_ipretty/User.png'
import contextHelper from 'ipretty/helpers/contextHelper'
import { dataURLtoFile } from 'ipretty/helpers/contextHelper'
import IconImage from "ipretty/components/IconImage"
import Tick_Done from '../../../../../public/icons_ipretty/Tick_Done.png'

const Infomation = React.memo((props) => {
    const { course, classes } = props
    const { getTranslation } = useAuth()
    const { renderAvatar } = contextHelper

    return (
        <React.Fragment>
            <div className="detail">
                <div className="detail__title">
                    <Typography>{getTranslation('CourseName')}</Typography>
                </div>
                <div className="detail__content">
                    <Typography>{course.course_name}</Typography>
                </div>
            </div>
            <div className="detail">
                <div className="detail__title">
                    <Typography>{getTranslation('CourseDescription')}</Typography>
                </div>
                <div className="detail__content">
                    <Typography>{course.course_description}</Typography>
                </div>
            </div>
            <div className="detail">
                <div className="detail__title">
                    <Typography>{getTranslation('Teacher')}</Typography>
                </div>
                <div className="detail__content">
                    <div className="detail__content--avatar">
                        {course && course.teacher && Object.keys(course.teacher).length > 0 && course.teacher.avatar != null ? (
                            <Avatar
                                variant="square"
                                className={classes.backGround}
                                src={renderAvatar(course.teacher.avatar)}
                            />
                        ) : (
                            <Avatar
                                variant="square"
                                className={classes.backGround}
                                src={BANNER_DEFAULT}
                            />
                        )}
                    </div>
                    <div className="detail__content--value">
                        <Typography>{course && course.teacher && Object.keys(course.teacher).length > 0 && course.teacher.name}</Typography>
                    </div>
                </div>
            </div>

            <div className="course-time">
                <div className="detail">
                    <div className="detail__title">
                        <Typography>{getTranslation('StartTime')}</Typography>
                    </div>
                    <div className="detail__content">
                        <Typography>{course.startTime}</Typography>
                    </div>
                </div>
                <div className="detail">
                    <div className="detail__title">
                        <Typography>{getTranslation('EndTime')}</Typography>
                    </div>
                    <div className="detail__content">
                        <Typography>{course.endTime}</Typography>
                    </div>
                </div>
            </div>

            <div className="detail">
                <div className="detail__title">
                    <Typography>{getTranslation('Category')}</Typography>
                </div>
                <div className="detail__content">
                    <Typography>{course.category}</Typography>
                </div>
            </div>

            <div className="course-type">
                <div className="detail">
                    <div className="detail__title">
                        <Typography>{getTranslation('CourseType')}</Typography>
                    </div>
                    <div className="detail__content">
                        <Typography>{getTranslation(course.course_type)}</Typography>
                    </div>
                </div>
                {course.course_type == 'Business' ? (
                    <div className="detail">
                        <div className="detail__title">
                            <Typography>{getTranslation('CoursePrice')}</Typography>
                        </div>
                        <div className="detail__content">
                            <Typography>{course.course_price ? course.course_price.toLocaleString('vi-VI') : 0} {course.unit_currency}</Typography>
                        </div>
                    </div>
                ) : '' }
            </div>

            <div className="detail">
                <div className="detail__title">
                    <Typography>{getTranslation('YouWillLearn')}</Typography>
                </div>
                <div className="detail__content detail__content--target">
                    {course.course_target && course.course_target.length > 0 && course.course_target.map((item, index) => (
                        <div className="course-target" key={index}>
                            <div className="course-target__icon">
                                <IconImage srcIcon={Tick_Done} />
                            </div>
                            <div className="course-target__value">
                                <Typography>{item}</Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="course-image">
                <div className="detail detail__course-feature-image">
                    <div className="detail__title">
                        <Typography>{getTranslation('CourseFeatureImage')}</Typography>
                    </div>
                    <div className="detail__img detail__cetificate-img">
                        {course && course.course_feature_image && course.course_feature_image != null ? (
                            <Avatar
                                variant="square"
                                className={classes.backGroundCourseFeature}
                                src={renderAvatar(course.course_feature_image)}
                            />
                        ) : (
                            <Avatar
                                variant="square"
                                className={classes.backGroundCourseFeature}
                                src={BANNER_DEFAULT}
                            />
                        )}
                    </div>
                </div>

                <div className="detail detail__certificate-image">
                    <div className="detail__title">
                        <Typography>{getTranslation('CertificateImage')}</Typography>
                    </div>
                    <div className="detail__img detail__feature-img">
                        {course && course.certificate_image && course.certificate_image != null ? (
                            <Avatar
                                variant="square"
                                className={classes.backGroundCourseFeature}
                                src={renderAvatar(course.certificate_image)}
                            />
                        ) : (
                            <Avatar
                                variant="square"
                                className={classes.backGroundCourseFeature}
                                src={BANNER_DEFAULT}
                            />
                        )}
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
})

export default Infomation