
import React, { useCallback } from 'react'
import TextInput from 'ipretty/components/TextInput'
import Delete from '../../../../public/icons_ipretty/Delete.png'
import PlusOrAdd from '../../../../public/icons_ipretty/Plus_Or_Add.png'
import { Button } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'

const CoursesTarget = React.memo((props) => {
    const {
        removeCourseTarget,
        changeValueCourseTarget,
        addItemCourseTarget,
        indexCourseTarget,
        courseTarget,
        coursesTarget
    } = props
    const { getTranslation } = useAuth()

    const handleAddItem = useCallback(e => {
        addItemCourseTarget(indexCourseTarget)
    }, [addItemCourseTarget, indexCourseTarget])

    const handleREmoveItem = useCallback(e => {
        removeCourseTarget(indexCourseTarget)
    }, [removeCourseTarget, indexCourseTarget])

    const onChange = useCallback(e => {
        changeValueCourseTarget(indexCourseTarget, { 'item_course_target': e.target.value })
    }, [changeValueCourseTarget, indexCourseTarget])

    return (
        <div className="course-target">
            <div className={coursesTarget.length < 2 ? "course-target__input--big" : "course-target__input--small"}>
                <TextInput
                    placeholder={getTranslation('PlaceholderCourseTarget')}
                    onChange={onChange}
                    fullWidth
                    value={courseTarget.item_course_target || ''}
                    noMargin
                />
            </div>
            <div className="course-target__button">
                <div className="course-target__button--add">
                    <Button variant="outlined" color="primary" className="session-chapter__button--add" onClick={handleAddItem} >
                        <IconImage srcIcon={PlusOrAdd} />
                    </Button>
                </div>
                {coursesTarget.length > 1 && (
                    <div className="course-target__button--remove">
                        <Button variant="outlined" color="primary" className="session-chapter__button--add" onClick={handleREmoveItem} >
                            <IconImage srcIcon={Delete} />
                        </Button>
                    </div>
                )}
            </div>
        </div >
    )
})

export default CoursesTarget