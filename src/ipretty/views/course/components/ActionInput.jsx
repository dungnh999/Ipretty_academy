import React, { useCallback, useMemo } from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import TextInput from 'ipretty/components/TextInput'
import DatePicker from 'ipretty/components/DatePicker/DatePicker'
import moment from 'moment'
import CoursePrice from './CoursePrice'
import { useAuth } from 'ipretty/context/AppProvider'

const GeneralInfomation = React.memo((props) => {
    const {
        classes,
        changeDataFields,
        course,
        indexCourse,
        coureCategories,
        options,
        errors,
        dispatchError
    } = props
    const { getTranslation } = useAuth()
    const courseTypes = useMemo(() => [
        {
            id: 'Local',
            name: getTranslation('Local')
        },
        {
            id: 'Business',
            name: getTranslation('Business')
        },
        {
            id: 'Group',
            name: getTranslation('Group')
        }
    ], [])

    const onChange = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        changeDataFields(nameField, indexCourse, { [nameField]: e.target.value })
    }, [changeDataFields, nameField, indexCourse])

    const onChangeDatetime = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        changeDataFields(nameField, indexCourse, { [nameField]: moment(e).format('YYYY-MM-DD HH:mm:ss') })
    }, [changeDataFields, nameField, indexCourse])

    return (
        <div className="infomation">
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('CourseName')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('PlaceholderCourseName')}
                        onChange={onChange('course_name')}
                        fullWidth
                        value={course.course_name || ''}
                        noMargin
                        helperText={errors && Object.keys(errors).length > 0 && errors['course_name'] ? errors['course_name'] : ''}
                    />
                </div>
            </div>
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('CourseDescription')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        onChange={onChange('course_description')}
                        fullWidth
                        value={course.course_description || ''}
                        noMargin
                        rows={4}
                        helperText={errors && Object.keys(errors).length > 0 && errors['course_description'] ? errors['course_description'] : ''}
                    />
                </div>
            </div>

            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('Teacher')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        select
                        options={options}
                        onChange={onChange('teacher_id')}
                        fullWidth
                        value={course.teacher_id || ''}
                        noMargin
                        subItem={true}
                        helperText={errors && Object.keys(errors).length > 0 && errors['teacher_id'] ? errors['teacher_id'] : ''}
                    />
                </div>
            </div>

            <div className="course-time">
                <div className="infomation-item time start-time">
                    <div className="infomation-item__title">
                        <TitleRequired title={getTranslation('StartTime')} required={false} />
                    </div>
                    <div className="infomation-item__input">
                        <DatePicker
                            type={'datetime-picker'}
                            handleDateChange={onChangeDatetime('startTime')}
                            value={course.startTime || null}
                            format={'yyyy-MM-dd HH:mm'}
                            // helperText={errors && Object.keys(errors).length > 0 && errors['startTime'] ? errors['startTime'] : ''}
                        />
                    </div>
                    {errors && Object.keys(errors).length > 0 && errors['startTime'] ? (
                        <div className={classes.showError}>{errors['startTime']}</div>
                    ) : ''}
                </div>

                <div className="infomation-item time end-time">
                    <div className="infomation-item__title">
                        <TitleRequired title={getTranslation('EndTime')} required={false} />
                    </div>
                    <div className="infomation-item__input">
                        <DatePicker
                            type={'datetime-picker'}
                            handleDateChange={onChangeDatetime('endTime')}
                            value={course.endTime || null}
                            clearable={true}
                            format={'yyyy-MM-dd HH:mm'}
                            // helperText={errors && Object.keys(errors).length > 0 && errors['endTime'] ? errors['endTime'] : ''}
                        />
                    </div>
                    {errors && Object.keys(errors).length > 0 && errors['endTime'] ? (
                        <div className={classes.showError}>{errors['endTime']}</div>
                    ) : ''}
                </div>
            </div>

            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('CourseType')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        select
                        options={courseTypes}
                        onChange={onChange('course_type')}
                        fullWidth
                        value={course.course_type || ''}
                        noMargin
                        helperText={errors && Object.keys(errors).length > 0 && errors['course_type'] ? errors['course_type'] : ''}
                    />
                </div>
            </div>

            <div className="course-overview">
                <div className="infomation-item category">
                    <div className="infomation-item__title">
                        <TitleRequired title={getTranslation('CourseCategories')} required={true} />
                    </div>
                    <div className="infomation-item__input">
                        <TextInput
                            select
                            options={coureCategories}
                            onChange={onChange('category_id')}
                            fullWidth
                            value={course.category_id || ''}
                            noMargin
                        />
                    </div>
                    {errors && Object.keys(errors).length > 0 && errors['category_id'] ? (
                        <div className={classes.showError}>{errors['category_id']}</div>
                    ) : ''}
                </div>
                {course.course_type == 'Business' && (
                    <CoursePrice
                        coursePrice={course.course_price}
                        changeDataFields={changeDataFields}
                        indexCourse={indexCourse}
                        courseCurrency={course.course_currency}
                    />
                )}
            </div>

        </div>
    )
})

export default GeneralInfomation