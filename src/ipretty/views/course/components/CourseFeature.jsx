import React from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import CourseFeatureImage from './CourseFeatureImage'
import CertificateImage from './CertificateImage'
import { useAuth } from 'ipretty/context/AppProvider'

const CourseFeature = React.memo((props) => {
    const { classes, stateCourseFeatureImage, uploadBannerCourse, errors } = props
    const { getTranslation } = useAuth()

    return (
        <div className="infomation">
            <div className="infomation-item infomation-item--right">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('CourseFeatureImage')} required={true} />
                </div>
                <div className="infomation-item__image">
                    <CourseFeatureImage
                        classes={classes}
                        courseFeatureImage={stateCourseFeatureImage.render_course_feature_image}
                        value={stateCourseFeatureImage.course_feature_image}
                        uploadBannerCourse={uploadBannerCourse}
                    />
                </div>
                {errors && Object.keys(errors).length > 0 && errors['course_feature_image'] ? (
                    <div className={classes.showError}>{errors['course_feature_image']}</div>
                ) : ''}
            </div>
            <div className="infomation-item infomation-item--left">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('CertificateImage')} required={true} />
                </div>
                <div className="infomation-item__image">
                    <CertificateImage
                        classes={classes}
                        certificateImage={stateCourseFeatureImage.render_certificate_image}
                        value={stateCourseFeatureImage.certificate_image}
                        uploadBannerCourse={uploadBannerCourse}
                    />
                </div>
                {errors && Object.keys(errors).length > 0 && errors['certificate_image'] ? (
                    <div className={classes.showError}>{errors['certificate_image']}</div>
                ) : ''}
            </div>
        </div>
    )
})

export default CourseFeature