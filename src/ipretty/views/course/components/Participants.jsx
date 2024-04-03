
import React, { memo, useCallback } from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import { useAuth } from 'ipretty/context/AppProvider'
import Plus from '../../../../public/icons_ipretty/Plus.png'
import IconImage from "ipretty/components/IconImage";
import { Button, Typography } from '@material-ui/core'
import Student from './imports/Student'
import Leader from './imports/Leader'

const Participants = memo((props) => {
    const { classes, students, leaders, dispatchStatus, optionstudents, optionleaders, errors } = props
    const { getTranslation } = useAuth()

    const handleShowPopupLeader = useCallback(e => {
        dispatchStatus({
            type: 'SHOW_AND_CLOSE_DIALOG',
            payload: {
                status: true,
                Component: Leader,
                title: getTranslation('AddAManager'),
                list: optionleaders,
                field: 'leader_ids',
                fieldRender: 'render_leader_ids',
                selected: leaders
            }
        })
    }, [leaders])

    const handleShowPopupStudent = useCallback(e => {
        dispatchStatus({
            type: 'SHOW_AND_CLOSE_DIALOG',
            payload: {
                status: true,
                Component: Student,
                title: 'Thêm học viên',
                list: optionstudents,
                field: 'student_ids',
                fieldRender: 'render_student_ids',
                selected: students
            }
        })
    }, [students])

    return (
        <div className="infomation">
            <div className={"infomation-item infomation-item--participants"}>
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('AddAManager')} required={false} />
                </div>
                <div className="infomation-item__autocomplete">
                    <Button
                        variant="contained"
                        color="primary"
                        className="button button__add-leader"
                        endIcon={<IconImage srcIcon={Plus} />}
                        onClick={handleShowPopupLeader}
                    >
                        {getTranslation('ChooseTheUserName')}
                    </Button>
                </div>
                {leaders.length > 0 && (
                    <div className="infomation-item__view">
                        {leaders.map((item, index) => (
                            <div className="view" key={index}>
                                <Typography>{`${item.name} ( ${item.email} )`}</Typography>
                            </div>
                        ))}
                    </div>
                )}
                {errors && Object.keys(errors).length > 0 && errors['leader_ids'] ? (
                    <div className={classes.showError}>{errors['leader_ids']}</div>
                ) : ''}
            </div>
            <div className={"infomation-item infomation-item--participants"}>
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('MoreStudents')} required={false} />
                </div>
                <div className="infomation-item__autocomplete">
                    <Button
                        variant="contained"
                        color="primary"
                        className="button button__add-student"
                        endIcon={<IconImage srcIcon={Plus} />}
                        onClick={handleShowPopupStudent}
                    >
                        {getTranslation('ChooseTheUserName')}
                    </Button>
                </div>
                {students.length > 0 && (
                    <div className="infomation-item__view">
                        {students.map((item, index) => (
                            <div className="view" key={index}>
                                <Typography>{`${item.name} ( ${item.email} )`}</Typography>
                            </div>
                        ))}
                    </div>
                )}
                {errors && Object.keys(errors).length > 0 && errors['student_ids'] ? (
                    <div className={classes.showError}>{errors['student_ids']}</div>
                ) : ''}
            </div>
        </div>
    )
})

export default Participants