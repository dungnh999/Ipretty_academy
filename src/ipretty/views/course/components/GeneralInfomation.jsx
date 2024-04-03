import React from 'react'
import ActionInput from './ActionInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import CoursesTarget from './CoursesTarget'
import CourseFeature from './CourseFeature'
import { useAuth } from 'ipretty/context/AppProvider'

const GeneralInfomation = React.memo((props) => {
    const {
        classes,
        changeDataFields,
        stateInfomationReducer,
        coureCategories,
        options,
        removeCourseTarget,
        changeValueCourseTarget,
        addItemCourseTarget,
        stateCourseTarget,
        stateCourseFeatureImage,
        uploadBannerCourse,
        stateErrorReducer,
        dispatchErrorImg,
        stateErrorCourseFeatureImage,
        dispatchError
    } = props
    const { getTranslation } = useAuth()

    return (
        <React.Fragment>
            {stateInfomationReducer.courses.map((course, indexCourse) => (
                <React.Fragment key={indexCourse}>
                    <ActionInput
                        classes={classes}
                        course={course}
                        indexCourse={indexCourse}
                        changeDataFields={changeDataFields}
                        coureCategories={coureCategories}
                        options={options}
                        errors={stateErrorReducer.error}
                        dispatchError={dispatchError}
                    />
                </React.Fragment>
            ))}
            <div className="infomation">
                <div className="infomation-item">
                    <div className="infomation-item__title">
                        <TitleRequired title={getTranslation('CourseTarget')} required={true} />
                    </div>
                    <div className="infomation-item__input">
                        <CoursesTarget
                            coursesTarget={stateCourseTarget.course_target}
                            removeCourseTarget={removeCourseTarget}
                            changeValueCourseTarget={changeValueCourseTarget}
                            addItemCourseTarget={addItemCourseTarget}
                            dispatchError={dispatchError}
                        />
                    </div>
                    {stateErrorReducer && Object.keys(stateErrorReducer.error).length > 0 && stateErrorReducer.error['course_target'] ? (
                        <div className={classes.showError}>{stateErrorReducer.error['course_target']}</div>
                    ) : ''}
                </div>
            </div>
            <div className="upload-image">
                <CourseFeature
                    classes={classes}
                    stateCourseFeatureImage={stateCourseFeatureImage}
                    uploadBannerCourse={uploadBannerCourse}
                    errors={stateErrorReducer.error}
                />
            </div>
        </React.Fragment>

    )

})

export default GeneralInfomation